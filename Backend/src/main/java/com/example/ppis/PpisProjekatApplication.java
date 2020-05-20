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
import java.util.Date;
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
									 EducationTypeRepository educationTypeRepository,
									 EducationRepository educationRepository,
									 EmployeeRepository employeeRepository,
									 EmployeeSkillRepository employeeSkillRepository,
									 SuplierRepository suplierRepository,
									 ContractRepository contractRepository,
									 CriteriaTypeRepository criteriaTypeRepository) {
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

			//edukacije
			Education education1 = educationRepository.save(new Education(skill1, educationType1, "Java for Beginners", "Niko Nikic", new Date()));
			Education education2 = educationRepository.save(new Education(skill2, educationType2, "SPA in React", "Marko Markovic", new Date()));

			log.info("Sve edukacije \n");
			for (Education education : educationRepository.findAll()) {
				log.info(education.toString());
			}
			log.info(" ");

			//uposlenici
			Employee employee1 = employeeRepository.save(new Employee("Ivo", "Ivic", new Date(), new Date()));
			Employee employee2 = employeeRepository.save(new Employee("Maja", "Majic", new Date(), new Date()));

			log.info("Svi uposlenici \n");
			for (Employee employee : employeeRepository.findAll()) {
				log.info(employee.getFirstName() + " " + employee.getLastName());
			}
			log.info(" ");

			//skillovi kod uposlenika

			EmployeeSkill employeeSkill1 = employeeSkillRepository.save(new EmployeeSkill(employee1, skill1, 5, new Date()));
			EmployeeSkill employeeSkill2 = employeeSkillRepository.save(new EmployeeSkill(employee2, skill1, 10, new Date()));

			log.info("Svi skilovi uposlenika \n");
			for (EmployeeSkill employeeSkill : employeeSkillRepository.findAll()) {
				log.info(employeeSkill.getSkill().getName());
			}
			log.info(" ");

			//Dobavljaci

			Suplier suplier1 = suplierRepository.save(new Suplier("HP", "Adresa1", "Niko Nikic"));
			Suplier suplier2 = suplierRepository.save(new Suplier("Import-Eksport", "Adresa 55", "Savo Savic"));
			Suplier suplier3 = suplierRepository.save(new Suplier("Iron Man Processors", "Adresa 153", "Stipo Stipic"));

			log.info("Dobavljaci \n");
			for (Suplier suplier : suplierRepository.findAll()) {
				log.info(suplier.getName());
			}
			log.info(" ");

			//Ugovori

			Contract contract1 = contractRepository.save(new Contract(suplier1, "Ugovor o nabavci laptopa", new Date(), new Date()));
			Contract contract2 = contractRepository.save(new Contract(suplier1, "Ugovor o nabavci slusalica", new Date(), new Date()));
			Contract contract3 = contractRepository.save(new Contract(suplier3, "Ugovor o nabavci procesora", new Date(), new Date()));

			log.info("Ugovori \n");
			for (Contract contract : contractRepository.findAll()) {
				log.info(contract.getName() + " Dobavljac: " + contract.getSuplier().getName());
			}
			log.info(" ");

			//Tipovi kriterija za ocjenjivanje

			CriteriaType criteriaType1 = criteriaTypeRepository.save(new CriteriaType("Cijena", 2.));
			CriteriaType criteriaType2 = criteriaTypeRepository.save(new CriteriaType("Brzina dostave", 2.));
			CriteriaType criteriaType3 = criteriaTypeRepository.save(new CriteriaType("Komunikacija", 1.));

			log.info("Kriteriji ocjenjivanja \n");
			for (CriteriaType criteriaType : criteriaTypeRepository.findAll()) {
				log.info(criteriaType.getName() + " Koeficijent: " + criteriaType.getCoeficient());
			}
			log.info(" ");
		};
	}


}
