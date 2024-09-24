package com.codecool.solarwatch.exception;

public class CityNotFoundException extends RuntimeException {
    public CityNotFoundException() {
        super("City not found");
    }
}
