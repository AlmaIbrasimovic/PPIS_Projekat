package com.example.demo.controller;

import com.example.demo.model.Role;
import com.example.demo.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;

@RestController
public class RoleController {

    @Autowired
    private RoleService roleService;

    @PostMapping("/role")
    @ResponseStatus(HttpStatus.CREATED)
    Role addRole(@RequestBody @Valid Role role) {
        return roleService.addNewRole(role);
    }

    @PutMapping("/role")
    Role editRole(@RequestBody Role novaRole) throws Exception {
        return roleService.editRole(novaRole,novaRole.getId());
    }

    @DeleteMapping("/role/{id}")
    HashMap<String,String> deleteRole(@PathVariable Integer id) throws Exception {
        return roleService.deleteRole(id);
    }
}
