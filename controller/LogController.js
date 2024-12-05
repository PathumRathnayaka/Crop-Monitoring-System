$(document).ready(function () {
    let logImageBase64 = '';

    // Convert file to Base64
    function convertToBase64(file, callback) {
        const reader = new FileReader();
        reader.onload = function (e) {
            callback(e.target.result);
        };
        reader.readAsDataURL(file);
    }

    // Handle file input for Log Image
    $('#log-Image').on('change', function (e) {
        const file = e.target.files[0];
        if (file) {
            convertToBase64(file, function (base64) {
                logImageBase64 = base64;
                console.log("Log Image Base64:", logImageBase64);
            });
        }
    });

    // Save Log
    $('#saveLogButton').on('click', function () {
        const newLog = {
            logCode: $('#Log-code').val(),
            logDate: $('#Log-Date').val(),
            observation: $('#observation').val(),
            logImage: logImageBase64,
            field: $('#fieldLog').val(),
            staff: $('#staff-log').val(),
            crop: $('#crop-log').val(),
        };

        $.ajax({
            url: 'http://localhost:8080/api/v1/logs', // Replace with your backend API URL
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(newLog),
            success: function () {
                alert('Log saved successfully!');
                loadLogTableData();
            },
            error: function (xhr, status, error) {
                console.error("Error saving log:", error);
            }
        });
    });

    // Update Log
    $('#updateLogButton').on('click', function () {
        const updatedLog = {
            logCode: $('#Log-code').val(),
            logDate: $('#Log-Date').val(),
            observation: $('#observation').val(),
            logImage: logImageBase64,
            field: $('#fieldLog').val(),
            staff: $('#staff-log').val(),
            crop: $('#crop-log').val(),
        };

        $.ajax({
            url: `http://localhost:8080/api/v1/logs/${updatedLog.logCode}`, // Replace with your backend API URL
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updatedLog),
            success: function () {
                alert('Log updated successfully!');
                loadLogTableData();
            },
            error: function (xhr, status, error) {
                console.error("Error updating log:", error);
            }
        });
    });

    // Delete Log
    $('#deleteLogButton').on('click', function () {
        const logCode = $('#Log-code').val();

        if (logCode) {
            $.ajax({
                url: `http://localhost:8080/api/v1/logs/${logCode}`, // Replace with your backend API URL
                method: 'DELETE',
                success: function () {
                    alert('Log deleted successfully!');
                    loadLogTableData();
                },
                error: function (xhr, status, error) {
                    console.error("Error deleting log:", error);
                }
            });
        } else {
            alert('Please enter a Log Code to delete.');
        }
    });

    // Load Log Table Data
    function loadLogTableData() {
        $.ajax({
            url: 'http://localhost:8080/api/v1/logs', // Replace with your backend API URL
            method: 'GET',
            success: function (data) {
                let tableBody = '';
                data.forEach(function (log) {
                    tableBody += `
                        <tr>
                            <td><input type="checkbox" class="listCheckbox"></td>
                            <td>${log.logCode}</td>
                            <td>${log.logDate}</td>
                            <td>${log.observation}</td>
                            <td><img src="${log.logImage}" alt="Log Image" style="width: 50px; height: 50px;"></td>
                            <td>${log.field}</td>
                            <td>${log.staff}</td>
                            <td>${log.crop}</td>
                        </tr>`;
                });
                $('.customtableCrop').html(tableBody);
            },
            error: function (xhr, status, error) {
                console.error("Error loading log table data:", error);
            }
        });
    }

    // Load Dropdown Data for Field, Staff, and Crop
    function loadDropdownData(endpoint, dropdownId) {
        $.ajax({
            url: `http://localhost:8080/api/v1/${endpoint}`, // Replace with your API URL
            method: 'GET',
            success: function (data) {
                const dropdown = $(`#${dropdownId}`);
                dropdown.empty();
                dropdown.append('<option selected>Open this select menu</option>');
                data.forEach(function (item) {
                    dropdown.append(`<option value="${item.id}">${item.name}</option>`);
                });
            },
            error: function (xhr, status, error) {
                console.error(`Error loading ${dropdownId} data:`, error);
            }
        });
    }

    // Load dropdown data on page load
    loadDropdownData('fields', 'fieldLog');
    loadDropdownData('staffs', 'staff-log');
    loadDropdownData('crops', 'crop-log');

    // Initialize Log Table Data
    loadLogTableData();
});