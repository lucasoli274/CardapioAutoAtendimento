package com.walkthru.resource;

import com.walkthru.entity.Curiosidade;
import com.walkthru.repository.CuriosidadeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Random;

@CrossOrigin(origins = "http://localhost:8081/")
@RestController
@RequestMapping("/curiosidade")
public class CuriosidadeResource {
    @Autowired
    private CuriosidadeRepository curiosidadeRepository;

    private static final String UPLOAD_DIR = "C:/WalkThru/Back-end/src/main/java/com/walkthru/upload/";

    @GetMapping("/imagem/{imageName}")
    public ResponseEntity<byte[]> getImage(@PathVariable String imageName) {
        try {
            Path imagePath = Paths.get(UPLOAD_DIR + imageName);
            byte[] imageBytes = Files.readAllBytes(imagePath);
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_PNG)
                    .body(imageBytes);
        } catch (IOException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/templos")
    public List<Curiosidade> getTemplos() {
        return curiosidadeRepository.findByTipo("Templo");
    }

    @GetMapping("/pratos")
    public List<Curiosidade> getPratos() {
        return curiosidadeRepository.findByTipo("Prato");
    }

    @GetMapping("/eventos")
    public List<Curiosidade> getEventos() {
        return curiosidadeRepository.findByTipo("Evento");
    }

    @PostMapping
    public Curiosidade postaCuriosidade(@RequestBody Curiosidade curiosidade) {
        return curiosidadeRepository.save(curiosidade);
    }

    @GetMapping("/pratos/random")
    public ResponseEntity<Curiosidade> getPratoAleatorio() {
        List<Curiosidade> pratos = curiosidadeRepository.findByTipo("Prato");
        if (pratos.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Random random = new Random();
        Curiosidade pratoRandom = pratos.get(random.nextInt(pratos.size()));
        return ResponseEntity.ok(pratoRandom);
    }
    @GetMapping("/templos/random")
    public ResponseEntity<Curiosidade> getTemploAleatorio() {
        List<Curiosidade> templos = curiosidadeRepository.findByTipo("Templo");
        if (templos.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Random random = new Random();
        Curiosidade temploRandom = templos.get(random.nextInt(templos.size()));
        return ResponseEntity.ok(temploRandom);
    }

    @GetMapping("/eventos/random")
    public ResponseEntity<Curiosidade> getEventoAleatorio() {
        List<Curiosidade> eventos = curiosidadeRepository.findByTipo("Evento");
        if (eventos.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Random random = new Random();
        Curiosidade eventoRandom = eventos.get(random.nextInt(eventos.size()));
        return ResponseEntity.ok(eventoRandom);
    }
}
