$(document).ready(function () {
    // Initialize table data
    loadTableData();
    loadStaffData();

    // Save method
    $('#saveVehicleButton').on('click', function () {
        const newVehicle = {
            vehicleCode: $('#vehicle-code').val(),
            licensePlate: $('#License-plate-number').val(),
            vehicleCategory: $('#floatingSelect').val(),
            fuelType: $('select[aria-label="Default select example"]:eq(0)').val(),
            status: $('select[aria-label="Default select example"]:eq(1)').val(),
            allocatedDriver: $('#Allocate-Driver').val(),
            remarks: $('#floatingTextarea').val()
        };

        $.ajax({
            url: 'http://localhost:8080/api/v1/vehicles', // Replace with your backend API URL
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(newVehicle),
            success: function () {
                alert('Vehicle saved successfully!');
                loadTableData();
            },
            error: function (xhr, status, error) {
                console.error("Error saving vehicle:", error);
            }
        });
    });

    // Update method
    $('#updateVehicleButton').on('click', function () {
        const updatedVehicle = {
            vehicleCode: $('#vehicle-code').val(),
            licensePlate: $('#License-plate-number').val(),
            vehicleCategory: $('#floatingSelect').val(),
            fuelType: $('select[aria-label="Default select example"]:eq(0)').val(),
            status: $('select[aria-label="Default select example"]:eq(1)').val(),
            allocatedDriver: $('#Allocate-Driver').val(),
            remarks: $('#floatingTextarea').val()
        };

        $.ajax({
            url: `http://localhost:8080/api/v1/vehicles/${updatedVehicle.vehicleCode}`, // Replace with your backend API URL
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updatedVehicle),
            success: function () {
                alert('Vehicle updated successfully!');
                loadTableData();
            },
            error: function (xhr, status, error) {
                console.error("Error updating vehicle:", error);
            }
        });
    });

    // Delete method
    $('#deleteVehicleButton').on('click', function () {
        const vehicleCode = $('#vehicle-code').val();

        if (vehicleCode) {
            $.ajax({
                url: `http://localhost:8080/api/v1/vehicles/${vehicleCode}`, // Replace with your backend API URL
                method: 'DELETE',
                success: function () {
                    alert('Vehicle deleted successfully!');
                    loadTableData();
                },
                error: function (xhr, status, error) {
                    console.error("Error deleting vehicle:", error);
                }
            });
        } else {
            alert('Please enter a Vehicle Code to delete.');
        }
    });

    // Load table data function
    function loadTableData() {
        $.ajax({
            url: 'http://localhost:8080/api/v1/vehicles', // Replace with your backend API URL
            method: 'GET',
            success: function (data) {
                let tableBody = '';
                data.forEach(function (vehicle) {
                    tableBody += `
                        <tr>
                            <td><input type="checkbox" class="listCheckbox"></td>
                            <td>${vehicle.vehicleCode}</td>
                            <td>${vehicle.licensePlate}</td>
                            <td>${vehicle.vehicleCategory}</td>
                            <td>${vehicle.fuelType}</td>
                            <td>${vehicle.status}</td>
                            <td>${vehicle.allocatedDriver}</td>
                            <td>${vehicle.remarks}</td>
                        </tr>`;
                });
                $('.customtable').html(tableBody);
            },
            error: function (xhr, status, error) {
                console.error("Error loading table data:", error);
            }
        });
    }

    // Load staff dropdown data
    function loadStaffData() {
        $.ajax({
            url: 'http://localhost:8080/api/v1/staff', // Replace with your StaffController API URL
            method: 'GET',
            success: function (data) {
                const dropdown = $('#staff-dropdown');
                dropdown.empty(); // Clear existing options
                dropdown.append('<option selected>Open this select menu</option>'); // Default option

                // Populate dropdown with staff data
                data.forEach(function (staff) {
                    dropdown.append(`<option value="${staff.staffId}">${staff.staffName}</option>`);
                });
            },
            error: function (xhr, status, error) {
                console.error("Error fetching staff data:", error);
            }
        });
    }
});
