package com.example.demo;

import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class PpisProjekatApplication {
	private static final Logger log =
			LoggerFactory.getLogger(PpisProjekatApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(PpisProjekatApplication.class, args);
	}

	@Bean
	public CommandLineRunner addData(UserRepository userRepository, RoleRepository roleRepository) {
		return(args) -> {
			Role role1 = roleRepository.save(new Role("administrator"));
			Role role2 = roleRepository.save(new Role("korisnik"));
			Role role3 = roleRepository.save(new Role("zaposlenik"));
			log.info("Sve uloge \n");
			for (Role role : roleRepository.findAll()) {
				log.info(role.getName());
			}
			log.info(" ");

			// korisnici
			List<Role> role = new ArrayList<>();
			role.add(role2);
			User k1 = userRepository.save(new User("anteantic", "1234567899876", "ante.antic@gmail.com", role));
			role.add(role3);
			User k2 = userRepository.save(new User("amno1amnic", "93832979237937", "amna.amnic@gmail.com", role));


			log.info("Svi korisnici \n");
			for (User user : userRepository.findAll()) {
				log.info(user.getUsername());
			}
		};
	}


}
