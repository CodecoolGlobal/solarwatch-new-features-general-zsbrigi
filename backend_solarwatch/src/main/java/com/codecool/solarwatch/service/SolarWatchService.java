package com.codecool.solarwatch.service;

import com.codecool.solarwatch.model.*;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class SolarWatchService {
    private static final String API_KEY = "76dd3293ef5729a6c6d7081782711bd6";
    private final RestTemplate restTemplate;
    private static final Logger logger = LoggerFactory.getLogger(SolarWatchService.class);
    private final CityRepository cityRepository;
    private final SunriseSunsetRepository sunriseSunsetRepository;

    @Autowired
    public SolarWatchService(RestTemplate restTemplate, CityRepository cityRepository, SunriseSunsetRepository sunriseSunsetRepository) {
        this.restTemplate = restTemplate;
        this.cityRepository = cityRepository;
        this.sunriseSunsetRepository = sunriseSunsetRepository;
    }

    public Cities getAllCities() {
        List<String> cities = cityRepository.findAll().stream().map(City::getName).toList();
        return new Cities(cities);
    }

    public Dates getAllDatesForCity(String city) {
        List<LocalDate> dates = sunriseSunsetRepository.findAll().stream().filter(sunriseSunset -> sunriseSunset.getCity() == getCity(city)).map(SunriseSunset::getDate).toList();
        return new Dates(dates);
    }

    public SolarReport addNewSunsetSunriseForCity(String cityName, LocalDate date) {
        City city = addNewCity(cityName);
        SunriseSunset sunriseSunset = addNewSunriseSunsetInformation(date, city);
        return new SolarReport(date, sunriseSunset.getSunset(), sunriseSunset.getSunrise(), city.getName());
    }

    public void deleteSunriseSunriseByCityName(String cityName) {
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

    private City addNewCity(String cityName) {
        if (getCityByName(cityName).isEmpty()) {
            City city = new City();
            String url = String.format("https://api.openweathermap.org/geo/1.0/direct?q=%s&limit=1&appid=%s", cityName, API_KEY);
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
        return city.get();
    }

    private SunriseSunset addNewSunriseSunsetInformation(LocalDate date, City city) {
        if (getSunriseSunsetByCityName(city, date).isEmpty()) {
        String url2 = String.format("https://api.sunrise-sunset.org/json?lat=%.8f&lng=%.8f&date=%tF", city.getLat(), city.getLon(), date);
        ResponseEntity<SolarReportResult> response2 = restTemplate.getForEntity(url2, SolarReportResult.class);
        SunriseSunset newSunriseSunset = new SunriseSunset();
        newSunriseSunset.setSunrise(Objects.requireNonNull(response2.getBody()).results().sunrise());
        newSunriseSunset.setSunset(response2.getBody().results().sunset());
        newSunriseSunset.setDate(date);
        newSunriseSunset.setCity(city);
        sunriseSunsetRepository.save(newSunriseSunset);
        return newSunriseSunset;
        }
        return getSunriseSunset(date, city);
    }

    private SunriseSunset getSunriseSunset(LocalDate date, City city) {
        Optional<SunriseSunset> sunriseSunset = getSunriseSunsetByCityName(city, date);
        return sunriseSunset.get();
    }

    private Optional<City> getCityByName(String city) {
        return cityRepository.findByName(city);
    }

    private Optional<SunriseSunset> getSunriseSunsetByCityName(City city, LocalDate date) {
        return sunriseSunsetRepository.findByCityAndDate(city, date);
    }
}
