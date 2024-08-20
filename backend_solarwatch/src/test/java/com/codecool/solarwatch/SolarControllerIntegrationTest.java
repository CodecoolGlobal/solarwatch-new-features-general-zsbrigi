package com.codecool.solarwatch;

import com.codecool.solarwatch.model.entity.City;
import com.codecool.solarwatch.model.entity.SunriseSunset;
import com.codecool.solarwatch.repository.CityRepository;
import com.codecool.solarwatch.repository.SunriseSunsetRepository;
import com.codecool.solarwatch.security.jwt.JwtUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

//@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
@ComponentScan(basePackages = "com.codecool.solarwatch")
@TestPropertySource(locations = "classpath:application-IT.properties")
public class SolarControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private SunriseSunsetRepository sunriseSunsetRepository;

    @MockBean
    private JwtUtils jwtUtils;


//    @MockBean
//    private SolarWatchService solarWatchService;

    @BeforeEach
    public void setup() {
        cityRepository.deleteAll();
        sunriseSunsetRepository.deleteAll();

        City city = new City();
        city.setName("London");
        city.setCountry("GB");
        city.setState("England");
        city.setLat(51.5074);
        city.setLon(-0.1278);
        cityRepository.save(city);

        SunriseSunset sunriseSunset = new SunriseSunset();
        sunriseSunset.setCity(city);
        sunriseSunset.setDate(LocalDate.of(2024, 7, 28));
        sunriseSunset.setSunrise("05:30:00");
        sunriseSunset.setSunset("20:30:00");
        sunriseSunsetRepository.save(sunriseSunset);
    }

    @Test
    @WithMockUser(roles = "USER")
    public void testGetSolarReport() throws Exception {
//        LocalDate date = LocalDate.of(2024, 7, 28);
//        SolarReport mockReport = new SolarReport(date, "20:30:00", "05:30:00", "London");
//
//        Mockito.when(solarWatchService.getSunsetSunriseForCity("London", date)).thenReturn(mockReport);

        mockMvc.perform(get("/user/solar")
                .param("city", "London")
                .param("date", "2024-07-28")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.city").value("London"))
                .andExpect(jsonPath("$.sunrise").value("05:30:00"))
                .andExpect(jsonPath("$.sunset").value("20:30:00"));

    }
}
