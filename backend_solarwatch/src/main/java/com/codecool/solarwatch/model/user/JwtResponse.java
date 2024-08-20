package com.codecool.solarwatch.model.user;

import java.util.List;

public record JwtResponse(String jwt, String username, List<String> roles) {
}
