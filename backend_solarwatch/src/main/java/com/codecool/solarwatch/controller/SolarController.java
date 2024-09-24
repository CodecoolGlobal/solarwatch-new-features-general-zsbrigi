package com.codecool.solarwatch.controller;

import com.codecool.solarwatch.model.dto.CityDTO;
import com.codecool.solarwatch.model.dto.DateDTO;
import com.codecool.solarwatch.model.dto.SolarReport;
import com.codecool.solarwatch.service.SolarWatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class SolarController {
    private final SolarWatchService openSolarService;

    @Autowired
    public SolarController(SolarWatchService openSolarService) {
        this.openSolarService = openSolarService;
    }


    @GetMapping("/solar")
    public SolarReport getSolarReport(@RequestParam(defaultValue = "London") String city, @RequestParam LocalDate date) {
        return openSolarService.getSunsetSunriseForCity(city, date);
    }

    @GetMapping("/cities")
    public List<CityDTO> getSolarCities() {
        return openSolarService.getAllCities();
    }

    @GetMapping("/dates")
    public List<DateDTO> getDates(@RequestParam String city) {
        return openSolarService.getAllDatesForCity(city);
    }
}
