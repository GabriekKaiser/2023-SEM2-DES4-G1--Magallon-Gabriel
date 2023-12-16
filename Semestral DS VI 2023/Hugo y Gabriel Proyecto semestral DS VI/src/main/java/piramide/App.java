package piramide;

import static spark.Spark.*;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;


public class App {

    public static void main(String[] args) {

        List<String> piramides = new ArrayList<String>();
        System.out.println("Executing on port: 4567");
        enableCors();

        get("/piramide", (req, res) -> {
            res.type("application/json");
            return piramides;
        });

        get("/piramide/:id", (req, res) -> { // validar que id sea int
            res.type("application/json");
            int rawId = Integer.parseInt(req.params(":id"));
            if (rawId >= 0 && rawId < piramides.size()) {
                String piramide = piramides.get(rawId);
                return "{\"pyramid\" : \" " +piramide + "\"}" ;
            } else {
                res.status(404);
                return "piramide no encontrada";
            }
        });

        post("/piramide", (req, res) -> {
            res.type("application/json");
            String all = req.body();
            System.out.println("datos de la piramide : "+all);
            piramides.add(all);
            return "Piramide Guardada";

        });
    }
     

    private static void enableCors() {
        options("/*", (request, response) -> {
            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }
    
            String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
            }
    
            return "OK";
        });
    
        before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));
    }

}
