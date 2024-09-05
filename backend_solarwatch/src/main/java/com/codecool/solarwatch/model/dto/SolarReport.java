package com.codecool.solarwatch.model.dto;

import java.time.LocalDate;

public record SolarReport(LocalDate date, String sunset, String sunrise, String city) {
}
