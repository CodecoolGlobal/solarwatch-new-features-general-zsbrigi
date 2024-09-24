package com.codecool.solarwatch.model.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class SunriseSunset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long sunriseSunsetId;
    private String sunrise;
    private String sunset;
    private LocalDate date;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn
    private City city;

    public long getSunriseSunsetId() {
        return sunriseSunsetId;
    }

    public void setSunriseSunsetId(long sunriseSunsetId) {
        this.sunriseSunsetId = sunriseSunsetId;
    }

    public String getSunrise() {
        return sunrise;
    }

    public String getSunset() {
        return sunset;
    }

    public LocalDate getDate() {
        return date;
    }

    public City getCity() {
        return city;
    }

    public void setSunrise(String sunrise) {
        this.sunrise = sunrise;
    }

    public void setSunset(String sunset) {
        this.sunset = sunset;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public void setCity(City city) {
        this.city = city;
    }
}
