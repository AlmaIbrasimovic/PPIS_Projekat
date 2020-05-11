package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/user/register")
    @ResponseStatus(HttpStatus.CREATED)
    User register(@Valid @RequestBody User noviUser) {
        return userService.register(noviUser);
    }

    @PostMapping("/user/login")
    HashMap<String, String> login(@RequestBody @Valid User user) throws Exception {
        return userService.login(user);
    }

    @DeleteMapping("/user/{id}")
    HashMap<String,String> deleteUser(@PathVariable Integer id) throws Exception {
        return userService.deleteUserById(id);
    }

    @GetMapping("/user/all")
    List<User> allUsers() throws Exception {
        return userService.getListOfUsers();
    }

}
