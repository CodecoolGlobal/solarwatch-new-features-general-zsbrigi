package com.codecool.solarwatch.model.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long cityId;
    private String name;
    private double lat;
    private double lon;
    private String state;
    private String country;
    @OneToMany(mappedBy = "city", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SunriseSunset> sunriseSunsets;

    public List<SunriseSunset> getSunriseSunsets() {
        return sunriseSunsets;
    }

    public void setSunriseSunsets(List<SunriseSunset> sunriseSunsets) {
        this.sunriseSunsets = sunriseSunsets;
    }

    public long getCityId() {
        return cityId;
    }

    public void setCityId(long cityId) {
        this.cityId = cityId;
    }

    public String getName() {
        return name;
    }

    public String getCountry() {
        return country;
    }

    public String getState() {
        return state;
    }

    public double getLat() {
        return lat;
    }

    public double getLon() {
        return lon;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setLat(double latitude) {
        this.lat = latitude;
    }

    public void setLon(double longitude) {
        this.lon = longitude;
    }

    public void setState(String state) {
        this.state = state;
    }

    public void setCountry(String country) {
        this.country = country;
    }

}
