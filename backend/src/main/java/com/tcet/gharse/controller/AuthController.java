package com.tcet.gharse.controller;

import com.tcet.gharse.dto.LoginRequest;
import com.tcet.gharse.entity.User;
import com.tcet.gharse.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        User saved = userService.register(user);
        saved.setPassword(null);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody LoginRequest req) {
        User loggedIn = userService.login(req.getEmail(), req.getPassword());
        if (loggedIn == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        loggedIn.setPassword(null);
        return ResponseEntity.ok(loggedIn);
    }
}
