package com.example.demo.service;

import com.example.demo.dto.ResponseMessageDTO;
import com.example.demo.model.Role;
import com.example.demo.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public Role addNewRole(Role role) {
        return roleRepository.save(role);
    }

    public Role editRole(Role newRole, Integer id) throws Exception {
        if (!roleRepository.existsById(id)) {
            throw new Exception("Rola sa id-em "+id+" ne postoji");
        }
        roleRepository.findById(id).map(
                role -> {
                    role.setName(newRole.getName());
                    return roleRepository.save(role);
                }
        );
        return roleRepository.findById(id).get();
    }

    public HashMap<String,String> deleteRole(Integer id) throws Exception {
        if (!roleRepository.existsById(id)) {
            throw new Exception("Rola sa id-em "+id+" ne postoji");
        }
        roleRepository.deleteById(id);
        return new ResponseMessageDTO("Uspjesno obrisana uloga sa id-em "+id).getHashMap();
    }
}
