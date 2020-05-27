package com.example.ppis.service;

import com.example.ppis.model.Certificate;
import com.example.ppis.model.Grade;
import com.example.ppis.repository.GradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GradeService {

    @Autowired
    GradeRepository gradeRepository;

    public Grade add(Grade grade)  {
        return gradeRepository.save(grade);
    }

    public List<Grade> getAllGrades() throws Exception {
        List<Grade> grades = new ArrayList<>();
        if(gradeRepository.count() == 0) {
            throw new Exception("Nema ocjena u bazi");
        }
        gradeRepository.findAll().forEach(grades::add);
        return grades;
    }

    public List<Grade> getAllGradesForSuplier(Integer suplierId) throws Exception {
        List<Grade> grades = getAllGrades();
        List<Grade> gradesForSuplier = new ArrayList<>();
        for(int i=0; i < grades.size(); i++) {
            if(grades.get(i).getSuplier().getId() == suplierId) {
                gradesForSuplier.add(grades.get(i));
            }
        }
        return gradesForSuplier;
    }

    public List<Grade> getAllGradesFromUser(Integer userId) throws Exception {
        List<Grade> grades = getAllGrades();
        List<Grade> gradesFromUser = new ArrayList<>();
        for(int i=0; i < grades.size(); i++) {
            if(grades.get(i).getUser().getId() == userId) {
                gradesFromUser.add(grades.get(i));
            }
        }
        return gradesFromUser;
    }

    public void deleteGradesForSuplier(Integer suplierId) throws Exception{
        List<Grade> suplierGrades = getAllGradesForSuplier(suplierId);
        for (int i = 0; i < suplierGrades.size(); i++) {
            gradeRepository.deleteById(suplierGrades.get(i).getId());
        }
    }

    public void deleteGradesFromUser(Integer userId) throws Exception{
        List<Grade> userGrades = getAllGradesFromUser(userId);
        for (int i = 0; i < userGrades.size(); i++) {
            gradeRepository.deleteById(userGrades.get(i).getId());
        }
    }

    public Float getFinalGradeForSuplier(Integer suplierId) throws Exception {
        List<Grade> grades = getAllGradesForSuplier(suplierId);
        Float finalGrade = 0f;
        for (Grade grade: grades) {
            finalGrade += grade.getGrade();
        }
        finalGrade /= grades.size();
        return finalGrade;
    }
}
