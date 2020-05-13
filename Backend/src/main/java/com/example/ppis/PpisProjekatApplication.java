package com.example.ppis;

import com.example.ppis.model.*;
import com.example.ppis.repository.*;
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
	public CommandLineRunner addData(UserRepository userRepository,
									 RoleRepository roleRepository,
									 SkillTypeRepository skillTypeRepository,
									 SkillRepository skillRepository,
									 EducationTypeRepository educationTypeRepository) {
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
			log.info(" ");

			//tipovi skilova
			List<SkillType> skillTypes = new ArrayList<>();
			SkillType skillType1 = skillTypeRepository.save(new SkillType("Razvoj softvera"));
			SkillType skillType2 = skillTypeRepository.save(new SkillType("Soft vještine"));
			SkillType skillType3 = skillTypeRepository.save(new SkillType("Mreže"));

			log.info("Svi tipovi vještina \n");
			for (SkillType skillType : skillTypeRepository.findAll()) {
				log.info(skillType.getName());
			}
			log.info(" ");

			//vještine
			Skill skill1 = skillRepository.save(new Skill("Java programiranje", skillType1));
			Skill skill2 = skillRepository.save(new Skill("React programiranje", skillType1));
			Skill skill3 = skillRepository.save(new Skill("Prezentacija", skillType2));

			log.info("Sve vještine \n");
			for (Skill skill : skillRepository.findAll()) {
				log.info(skill.getName() + " Tip vještine: " + skill.getSkillType().getName());
			}
			log.info(" ");

			//tipovi edukacije
			EducationType educationType1 = educationTypeRepository.save(new EducationType("Interna"));
			EducationType educationType2 = educationTypeRepository.save(new EducationType("Eksterna"));

			log.info("Svi tipovi edukacija \n");
			for (EducationType educationType : educationTypeRepository.findAll()) {
				log.info(educationType.getName());
			}
			log.info(" ");
		};
	}


}
