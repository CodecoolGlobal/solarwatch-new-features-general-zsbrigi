package com.codecool.solarwatch.model;

import java.time.LocalDate;

public record SolarReport(LocalDate date, String sunset, String sunrise, String city) {
}
