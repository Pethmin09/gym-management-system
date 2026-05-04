package com.gym.dao;

import com.gym.model.Equipment;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class EquipmentDAO {

    // ================= ADD =================
    public static int save(Equipment e) {

        try (Connection con = DBConnection.getConnection()) {

            if (con == null) return 0;

            String sql = "INSERT INTO equipment(name,type,quantity,condition_status) VALUES(?,?,?,?)";

            PreparedStatement ps = con.prepareStatement(sql);

            ps.setString(1, e.getName());
            ps.setString(2, e.getType());
            ps.setInt(3, e.getQuantity());
            ps.setString(4, e.getCondition().trim());

            return ps.executeUpdate();

        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return 0;
    }

    // ================= GET ALL =================
    public static List<Equipment> getAll() {

        List<Equipment> list = new ArrayList<>();

        try (Connection con = DBConnection.getConnection()) {

            if (con == null) return list;

            String sql = "SELECT * FROM equipment";

            PreparedStatement ps = con.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {

                Equipment e = new Equipment();

                e.setId(rs.getInt("id"));
                e.setName(rs.getString("name"));
                e.setType(rs.getString("type"));
                e.setQuantity(rs.getInt("quantity"));
                e.setCondition(rs.getString("condition_status"));

                list.add(e);
            }

        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return list;
    }

    // ================= DELETE =================
    public static int delete(int id) {

        try (Connection con = DBConnection.getConnection()) {

            if (con == null) return 0;

            String sql = "DELETE FROM equipment WHERE id=?";

            PreparedStatement ps = con.prepareStatement(sql);
            ps.setInt(1, id);

            return ps.executeUpdate();

        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return 0;
    }

    // ================= GET BY ID =================
    public static Equipment getById(int id) {

        try (Connection con = DBConnection.getConnection()) {

            if (con == null) return null;

            String sql = "SELECT * FROM equipment WHERE id=?";

            PreparedStatement ps = con.prepareStatement(sql);
            ps.setInt(1, id);

            ResultSet rs = ps.executeQuery();

            if (rs.next()) {

                Equipment e = new Equipment();

                e.setId(rs.getInt("id"));
                e.setName(rs.getString("name"));
                e.setType(rs.getString("type"));
                e.setQuantity(rs.getInt("quantity"));
                e.setCondition(rs.getString("condition_status"));

                return e;
            }

        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return null;
    }

    // ================= UPDATE =================
    public static int update(Equipment e) {

        try (Connection con = DBConnection.getConnection()) {

            if (con == null) return 0;

            String sql = "UPDATE equipment SET name=?,type=?,quantity=?,condition_status=? WHERE id=?";

            PreparedStatement ps = con.prepareStatement(sql);

            ps.setString(1, e.getName());
            ps.setString(2, e.getType());
            ps.setInt(3, e.getQuantity());
            ps.setString(4, e.getCondition().trim());
            ps.setInt(5, e.getId());

            return ps.executeUpdate();

        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return 0;
    }

    // ================= SEARCH =================
    public static List<Equipment> search(String keyword) {

        List<Equipment> list = new ArrayList<>();

        try (Connection con = DBConnection.getConnection()) {

            if (con == null) return list;

            String sql = "SELECT * FROM equipment WHERE name LIKE ? OR type LIKE ?";

            PreparedStatement ps = con.prepareStatement(sql);

            ps.setString(1, "%" + keyword + "%");
            ps.setString(2, "%" + keyword + "%");

            ResultSet rs = ps.executeQuery();

            while (rs.next()) {

                Equipment e = new Equipment();

                e.setId(rs.getInt("id"));
                e.setName(rs.getString("name"));
                e.setType(rs.getString("type"));
                e.setQuantity(rs.getInt("quantity"));
                e.setCondition(rs.getString("condition_status"));

                list.add(e);
            }

        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return list;
    }

    // ================= TOTAL =================
    public static int getCount() {

        try (Connection con = DBConnection.getConnection()) {

            if (con == null) return 0;

            String sql = "SELECT COUNT(*) FROM equipment";

            PreparedStatement ps = con.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) return rs.getInt(1);

        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return 0;
    }

    // ================= AVAILABLE =================
    public static int getAvailableCount() {

        try (Connection con = DBConnection.getConnection()) {

            if (con == null) return 0;

            String sql = "SELECT COUNT(*) FROM equipment WHERE LOWER(TRIM(condition_status)) IN ('good','excellent','working','available')";

            PreparedStatement ps = con.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) return rs.getInt(1);

        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return 0;
    }

    // ================= BROKEN =================
    public static int getBrokenCount() {

        try (Connection con = DBConnection.getConnection()) {

            if (con == null) return 0;

            String sql = "SELECT COUNT(*) FROM equipment WHERE LOWER(TRIM(condition_status)) IN ('broken','damaged','not working')";

            PreparedStatement ps = con.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) return rs.getInt(1);

        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return 0;
    }
}