package com.codecool.solarwatch.service;

import com.codecool.solarwatch.exception.CityNotFoundException;
import com.codecool.solarwatch.exception.SunsetSunriseNotFoundException;
import com.codecool.solarwatch.model.dto.*;
import com.codecool.solarwatch.model.entity.City;
import com.codecool.solarwatch.model.entity.SunriseSunset;
import com.codecool.solarwatch.repository.CityRepository;
import com.codecool.solarwatch.repository.SunriseSunsetRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class SolarWatchService {
    private static final String API_KEY = System.getenv("API_KEY");
    private final RestTemplate restTemplate;
    private static final Logger logger = LoggerFactory.getLogger(SolarWatchService.class);
    private final CityRepository cityRepository;
    private final SunriseSunsetRepository sunriseSunsetRepository;
    private static final String OPEN_WEATHER_URL = "https://api.openweathermap.org/geo/1.0/direct?q=%s&limit=1&appid=%s";
    private static final String SUNSET_SUNRISE_URL = "https://api.sunrise-sunset.org/json?lat=%.8f&lng=%.8f&date=%tF";

    @Autowired
    public SolarWatchService(RestTemplate restTemplate, CityRepository cityRepository, SunriseSunsetRepository sunriseSunsetRepository) {
        this.restTemplate = restTemplate;
        this.cityRepository = cityRepository;
        this.sunriseSunsetRepository = sunriseSunsetRepository;
    }

    public List<CityDTO> getAllCities() {
        List<City> cities = cityRepository.findAll();
        return cities.stream().map(this::convertToCityDTO).toList();
    }

    public List<DateDTO> getAllDatesForCity(String city) {
        List<LocalDate> dates = sunriseSunsetRepository.findAll().stream().filter(sunriseSunset -> sunriseSunset.getCity() == getCity(city)).map(SunriseSunset::getDate).toList();
        return dates.stream().map(this::convertToDateDTO).toList();
    }

    public SolarReport addNewSunsetSunriseForCity(String cityName, LocalDate date) {
        City city = addNewCity(cityName);
        SunriseSunset sunriseSunset = addNewSunriseSunsetInformation(date, city);
        return new SolarReport(date, sunriseSunset.getSunset(), sunriseSunset.getSunrise(), city.getName());
    }

    public void deleteCity(String cityName) {
        try {
            City city = getCity(cityName);
            cityRepository.delete(city);
            logger.info("City {} deleted", cityName);
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
    }

    public SolarReport getSunsetSunriseForCity(String cityName, LocalDate date) {
        City city = getCity(cityName);
        SunriseSunset sunriseSunset = getSunriseSunset(date, city);
        return new SolarReport(date, sunriseSunset.getSunset(), sunriseSunset.getSunrise(), city.getName());
    }

    private CityDTO convertToCityDTO(City city) {
        return new CityDTO(city.getName());
    }
    private DateDTO convertToDateDTO(LocalDate date) {
        return new DateDTO(date);
    }

    private City addNewCity(String cityName) {
        if (getCityByName(cityName).isEmpty()) {
            City city = new City();
            String url = String.format(OPEN_WEATHER_URL, cityName, API_KEY);
            ResponseEntity<CityReport[]> response = restTemplate.getForEntity(url, CityReport[].class);
            city.setName(cityName);
            city.setCountry(Objects.requireNonNull(response.getBody())[0].country());
            city.setState(response.getBody()[0].state());
            city.setLat(response.getBody()[0].lat());
            city.setLon(response.getBody()[0].lon());
            cityRepository.save(city);
            return city;
        }
        return getCity(cityName);
    }

    private City getCity(String cityName) {
        Optional<City> city = getCityByName(cityName);
        if (city.isPresent()) {
            return city.get();
        } else {
            throw new CityNotFoundException();
        }
    }

    private SunriseSunset addNewSunriseSunsetInformation(LocalDate date, City city) {
        if (getSunriseSunsetByCityName(city, date).isEmpty()) {
        String url = String.format(SUNSET_SUNRISE_URL, city.getLat(), city.getLon(), date);
        ResponseEntity<SolarReportResult> response = restTemplate.getForEntity(url, SolarReportResult.class);
        SunriseSunset newSunriseSunset = new SunriseSunset();
        newSunriseSunset.setSunrise(Objects.requireNonNull(response.getBody()).results().sunrise());
        newSunriseSunset.setSunset(response.getBody().results().sunset());
        newSunriseSunset.setDate(date);
        newSunriseSunset.setCity(city);
        sunriseSunsetRepository.save(newSunriseSunset);
        return newSunriseSunset;
        }
        return getSunriseSunset(date, city);
    }

    private SunriseSunset getSunriseSunset(LocalDate date, City city) {
        Optional<SunriseSunset> sunriseSunset = getSunriseSunsetByCityName(city, date);
        if (sunriseSunset.isPresent()) {
            return sunriseSunset.get();
        } else {
            throw new SunsetSunriseNotFoundException();
        }
    }

    private Optional<City> getCityByName(String city) {
        return cityRepository.findByName(city);
    }

    private Optional<SunriseSunset> getSunriseSunsetByCityName(City city, LocalDate date) {
        return sunriseSunsetRepository.findByCityAndDate(city, date);
    }
}
