package com.codecool.solarwatch.exception;

public class SunsetSunriseNotFoundException extends RuntimeException{
    public SunsetSunriseNotFoundException() {
        super("Sunrise and sunset information not found");
    }
}
