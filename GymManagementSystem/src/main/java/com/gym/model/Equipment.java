package com.gym.model;

public class Equipment {

        private int id;
        private String name;
        private String type;
        private int quantity;
        private String condition;

        public int getId() { return id; }
        public void setId(int id) { this.id = id; }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getType() { return type; }
        public void setType(String type) { this.type = type; }

        public int getQuantity() { return quantity; }
        public void setQuantity(int quantity) { this.quantity = quantity; }

        public String getCondition() { return condition; }
        public void setCondition(String condition) { this.condition = condition; }
    }

