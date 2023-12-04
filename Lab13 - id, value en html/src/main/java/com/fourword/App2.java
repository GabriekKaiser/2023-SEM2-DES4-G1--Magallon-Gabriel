package com.fourword;
import static spark.Spark.*;

import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONObject;


class Numbers{
    public ArrayList<Integer> number = new ArrayList<Integer>();

    public void add(Integer num) {
        number.add(num);
    }

    public JSONArray all() {
        JSONArray json = new JSONArray();
        for(int i = 0; i < number.size(); i++) {
            JSONObject obj = new JSONObject();
            obj.put("id", i);
            obj.put("value", number.get(i));
            json.put(obj);
        }
        return json;
    }

    public JSONObject get (int id){
        JSONObject json =new JSONObject();
        json.put("id", id);
        json.put("value", number.get(id));
        return json;
    }

    public int average() {
        if (number.size() == 0) {
            return 0;
        }
        int suma = 0;
        for (int i = 0; i < all().length(); i++) {
            suma += number.get(i);
        }
        return suma / number.size();
    }
}



public class App2 {

    public static void main(String[] args) {

        Numbers number = new Numbers();
        System.out.println("Executing on port: 4567");
        enableCors();
        get("/numeros", (req, res) -> {
            res.type("application/json");
            JSONObject json = new JSONObject();
            json.put("data", number.all());
            json.put("average", number.average());
            return json.toString();
        });
        get("/numeros/:id", (req, res) -> { // validar que id sea int
            res.type("application/json");
            String rawId = req.params("id");
            int id = Integer.parseInt(rawId);
            return number.get(id);
        });
        post("/numeros", (req, res) -> {
            res.type("application/json");
            JSONObject json = new JSONObject(req.body());
            int value = Integer.parseInt(json.getString("nota"));
            number.add(value);
            JSONObject jsonResponse = new JSONObject();
            jsonResponse.put("data", number.all());
            jsonResponse.put("average", number.average());
            return jsonResponse;
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