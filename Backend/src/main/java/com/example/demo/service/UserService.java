package com.example.demo.service;

import com.example.demo.dto.ResponseMessageDTO;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

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

    public HashMap<String, String> deleteUserById(Integer id) throws Exception {
        if (!userRepository.existsById(id)) {
            throw new Exception("Obrisan user sa id-em "+id);
        }
        deleteDependencies(id);
        userRepository.deleteById(id);
        return new ResponseMessageDTO("Uspjesno obrisan korisnik sa id-em " + id).getHashMap();
    }

    public List<User> getListOfUsers() throws Exception {
        if (userRepository.count() == 0) {
            throw new Exception("Nema korisnika u bazi");
        }
        List<User> sviKorisnici = new ArrayList<>();
        userRepository.findAll().forEach(sviKorisnici::add);
        return sviKorisnici;
    }
}
