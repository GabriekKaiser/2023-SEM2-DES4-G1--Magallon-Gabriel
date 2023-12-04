package com.fourword;
import static spark.Spark.*;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;


class Numbers {
    ArrayList <Integer> numbers = new ArrayList<Integer>();
    
    public JSONArray all(){
        JSONArray json = new JSONArray();
        for(int i= 0 ; i < numbers.size(); i++){
            JSONObject obj = new JSONObject();
            obj.put("id", i);
            obj.put("value", numbers.get(i));
            json.put(obj);
        }
        return json;
    }

    public JSONObject get (int id){
        JSONObject json =new JSONObject();
        json.put("id", id);
        json.put("value", numbers.get(id));
        return json;
    }

    public void add(int value){
        numbers.add(value);
    }

    public int average(){
        if (numbers.size() == 0){
            return 0;
        }
        int suma=0;
        for(int i=0; i < numbers.size(); i++){
            suma += numbers.get(i);
        }
        return suma/numbers.size();
    }
    
}


public class App2 {
    public static void main(String[] args) {
        Numbers numbers = new Numbers();
        System.out.println("Executing on port: 4567");
        enableCors();
        get("/numeros", (req, res) -> {
            res.type("application/json");
            JSONObject json = new JSONObject();
            json.put("data", numbers.all());
            json.put("average", numbers.average()); 
         return json.toString();
        });

        get("/numeros/:id", (req, res) -> {
            res.type("application/json");
            int id = Integer.parseInt(req.params("id"));
         return numbers.all().get(id).toString();
        });

        post("/numeros", (req, res) -> {
            res.type("application/json");
            JSONObject json =new JSONObject(req.body());
            int value = json.getInt("numero");
            numbers.add(value);
            JSONObject jsonResponse = new JSONObject();
            jsonResponse.put("data", numbers.all());
            jsonResponse.put("average", numbers.average());
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