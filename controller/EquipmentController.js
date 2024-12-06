$(document).ready(function () {
    let equipmentStatus = '';
    let equipmentField = '';
    let equipmentStaff = '';

    // Save method
    $('#saveEquipmentButton').on('click', function () {
        const newEquipment = {
            equipmentCode: $('#Equipment-code').val(),
            equipmentName: $('#Equipment-Name').val(),
            equipmentType: $('#Equipment-type').val(),
            equipmentStatus: $('#Equipment-status').val(),
            fieldCode: $('#field-dropdownEquipment').val(),
            staffCode: $('#staff-Equipment').val()
        };

        $.ajax({
            url: 'http://localhost:8080/api/v1/equipment', // Replace with your API URL
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(newEquipment),
            success: function () {
                alert('Equipment saved successfully!');
                loadEquipmentTable();
            },
            error: function (xhr, status, error) {
                console.error("Error saving equipment:", error);
            }
        });
    });

    // Update method
    $('#updateEquipmentButton').on('click', function () {
        const updatedEquipment = {
            equipmentCode: $('#Equipment-code').val(),
            equipmentName: $('#Equipment-Name').val(),
            equipmentType: $('#Equipment-type').val(),
            equipmentStatus: $('#Equipment-status').val(),
            fieldCode: $('#field-dropdownEquipment').val(),
            staffCode: $('#staff-Equipment').val()
        };

        $.ajax({
            url: `http://localhost:8080/api/v1/equipment/${updatedEquipment.equipmentCode}`, // Replace with your API URL
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updatedEquipment),
            success: function () {
                alert('Equipment updated successfully!');
                loadEquipmentTable();
            },
            error: function (xhr, status, error) {
                console.error("Error updating equipment:", error);
            }
        });
    });

    // Delete method
    $('#deleteEquipmentButton').on('click', function () {
        const equipmentCode = $('#Equipment-code').val();

        if (equipmentCode) {
            $.ajax({
                url: `http://localhost:8080/api/v1/equipment/${equipmentCode}`, // Replace with your API URL
                method: 'DELETE',
                success: function () {
                    alert('Equipment deleted successfully!');
                    loadEquipmentTable();
                },
                error: function (xhr, status, error) {
                    console.error("Error deleting equipment:", error);
                }
            });
        } else {
            alert('Please enter an Equipment Code to delete.');
        }
    });

    // Load Equipment Table
    function loadEquipmentTable() {
        $.ajax({
            url: 'http://localhost:8080/api/v1/equipment', // Replace with your API URL
            method: 'GET',
            success: function (data) {
                let tableBody = '';
                data.forEach(function (equipment) {
                    tableBody += `
                        <tr>
                            <td><input type="checkbox" class="listCheckbox"></td>
                            <td>${equipment.equipmentCode}</td>
                            <td>${equipment.equipmentName}</td>
                            <td>${equipment.equipmentType}</td>
                            <td>${equipment.equipmentStatus}</td>
                            <td>${equipment.staffCode}</td>
                            <td>${equipment.fieldCode}</td>
                        </tr>`;
                });
                $('.customtableCrop').html(tableBody);
            },
            error: function (xhr, status, error) {
                console.error("Error loading equipment table:", error);
            }
        });
    }

    // Initialize dropdowns for Field and Staff
    function loadDropdowns() {
        $.ajax({
            url: 'http://localhost:8080/api/v1/fields',
            method: 'GET',
            success: function (data) {
                const fieldDropdown = $('#field-dropdownEquipment');
                fieldDropdown.empty();
                fieldDropdown.append('<option selected>Open this select menu</option>');
                data.forEach(function (field) {
                    fieldDropdown.append(`<option value="${field.fieldCode}">${field.fieldCode}</option>`);
                });
            },
            error: function (xhr, status, error) {
                console.error("Error loading field dropdown:", error);
            }
        });

        $.ajax({
            url: 'http://localhost:8080/api/v1/staff',
            method: 'GET',
            success: function (data) {
                const staffDropdown = $('#staff-Equipment');
                staffDropdown.empty();
                staffDropdown.append('<option selected>Open this select menu</option>');
                data.forEach(function (staff) {
                    staffDropdown.append(`<option value="${staff.staffCode}">${staff.staffCode}</option>`);
                });
            },
            error: function (xhr, status, error) {
                console.error("Error loading staff dropdown:", error);
            }
        });
    }

    // Load initial data
    loadEquipmentTable();
    loadDropdowns();
});