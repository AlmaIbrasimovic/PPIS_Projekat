package com.example.ppis.service;

import com.example.ppis.model.Certificate;
import com.example.ppis.repository.CertificateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CertificateService {

    @Autowired
    CertificateRepository certificateRepository;

    public Certificate addCertificate(Certificate certificate) {
       return certificateRepository.save(certificate);
    }

    public Certificate getCertificateById(Integer id) throws  Exception {
        if(!certificateRepository.existsById(id)) {
            throw new Exception("Ne postoji taj certifikat");
        }
        return certificateRepository.findById(id).get();
    }

    public List<Certificate> getAllCertificates() {
        List<Certificate> certificates = new ArrayList<>();
        certificateRepository.findAll().forEach(certificates::add);
        return certificates;
    }

    public void deleteCertificate(Integer id) throws Exception {
        if(!certificateRepository.existsById(id)) {
            throw new Exception("Ne postoji taj certifikat");
        }
        certificateRepository.deleteById(id);
    }
}
