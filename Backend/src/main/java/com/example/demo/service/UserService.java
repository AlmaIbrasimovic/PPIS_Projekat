package com.example.demo.service;

import com.example.demo.dto.ResponseMessageDTO;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User register(User newUser) {
        newUser.setPassword(hashPassword(newUser.getPassword()));
        return userRepository.save(newUser);
    }

    private String hashPassword(String password) {
        String hashPassword = passwordEncoder.encode(password);
        return hashPassword;
    }

    private boolean matchPasswords(String plainText, String hashPassword) {
        return passwordEncoder.matches(plainText, hashPassword);
    }

    public HashMap<String, String> login(User user) throws Exception {
        User userWithEmail = userRepository.findByEmail(user.getEmail());

        if (userWithEmail == null) {
            throw new Exception("Korisnik s emailom " + user.getEmail() + " ne postoji");
        } else if (!matchPasswords(user.getPassword(), userWithEmail.getPassword())) {
            throw new Exception("Pogresna sifra!");
        }
        return new ResponseMessageDTO("Uspjesno ste prijavljeni na sistem").getHashMap();
    }
}
