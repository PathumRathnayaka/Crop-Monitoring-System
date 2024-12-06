$(document).ready(function () {
    let image1Base64 = '';
    let image2Base64 = '';

    // Convert file to Base64
    function convertToBase64(file, callback) {
        const reader = new FileReader();
        reader.onload = function (e) {
            callback(e.target.result);
        };
        reader.readAsDataURL(file);
    }

    // Handle file input for Image 1
    $('#fieldImage1').on('change', function (e) {
        const file = e.target.files[0];
        if (file) {
            convertToBase64(file, function (base64) {
                image1Base64 = base64;
                console.log("Image 1 Base64:", image1Base64);
            });
        }
    });

    // Handle file input for Image 2
    $('#fieldImage2').on('change', function (e) {
        const file = e.target.files[0];
        if (file) {
            convertToBase64(file, function (base64) {
                image2Base64 = base64;
                console.log("Image 2 Base64:", image2Base64);
            });
        }
    });

    // Save method
    $('#saveButton').on('click', function () {
        const newField = {
            fieldCode: $('#field-code').val(),
            fieldName: $('#field-name').val(),
            fieldLocation: $('#field-Location').val(),
            fieldSize: $('#field-Size').val(),
            fieldImage: image1Base64,
            fieldImage2: image2Base64
        };
        console.log(newField)
        $.ajax({
            url: 'http://localhost:8080/api/v1/fields', // Replace with your backend API URL
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(newField),
            success: function () {
                alert('Field saved successfully!');
                loadTableData();
            },
            error: function (xhr, status, error) {
                console.error("Error saving field:", error);
            }
        });
    });

    // Update method
    $('#updateButton').on('click', function () {
        const updatedField = {
            fieldCode: $('#field-code').val(),
            fieldName: $('#field-name').val(),
            fieldLocation: $('#field-Location').val(),
            fieldSize: $('#field-Size').val(),
            image1: image1Base64,
            image2: image2Base64
        };

        $.ajax({
            url: `/api/fields/${updatedField.fieldCode}`, // Replace with your backend API URL
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updatedField),
            success: function () {
                alert('Field updated successfully!');
                loadTableData();
            },
            error: function (xhr, status, error) {
                console.error("Error updating field:", error);
            }
        });
    });

    // Delete method (unchanged)
    $('#deleteButton').on('click', function () {
        const fieldCode = $('#field-code').val();

        if (fieldCode) {
            $.ajax({
                url: `http://localhost:8080/api/v1/fields/${fieldCode}`, // Replace with your backend API URL
                method: 'DELETE',
                success: function () {
                    alert('Field deleted successfully!');
                    loadTableData();
                },
                error: function (xhr, status, error) {
                    console.error("Error deleting field:", error);
                }
            });
        } else {
            alert('Please enter a Field Code to delete.');
        }
    });

    // Load table data function
    function loadTableData() {
        $.ajax({
            url: 'http://localhost:8080/api/v1/fields', // Replace with your backend API URL
            method: 'GET',
            success: function (data) {
                let tableBody = '';
                data.forEach(function (field) {
                    tableBody += `
                        <tr>
                            <td><input type="checkbox" class="listCheckbox"></td>
                            <td>${field.fieldCode}</td>
                            <td>${field.fieldName}</td>
                            <td>${field.fieldLocation}</td>
                            <td>${field.fieldSize}</td>
                            <td><img src="${field.image1}" alt="Image 1" style="width: 50px; height: 50px;"></td>
                            <td><img src="${field.image2}" alt="Image 2" style="width: 50px; height: 50px;"></td>
                        </tr>`;
                });
                $('.customtable').html(tableBody);
            },
            error: function (xhr, status, error) {
                console.error("Error loading table data:", error);
            }
        });
    }

    // Initialize table data
    loadTableData();
});
$(document).ready(function () {
    // Fetch FieldCode data from FieldController
    function loadFieldCodes() {
        $.ajax({
            url: 'http://localhost:8080/api/v1/fields', // Replace with your FieldController API URL
            method: 'GET',
            success: function (data) {
                const dropdown = $('#field-dropdown');
                dropdown.empty(); // Clear existing options
                dropdown.append('<option selected>Open this select menu</option>'); // Default option

                // Populate dropdown with field codes
                data.forEach(function (field) {
                    dropdown.append(`<option value="${field.fieldCode}">${field.fieldCode}</option>`);
                });
            },
            error: function (xhr, status, error) {
                console.error("Error fetching FieldCodes:", error);
            }
        });
    }

    // Call the function to load field codes when the page loads
    loadFieldCodes();
});

/*staff dropdown-------*/
$(document).ready(function () {
    // Fetch FieldCode data from FieldController and populate the dropdown
    function loadFieldCodesForStaff() {
        $.ajax({
            url: 'http://localhost:8080/api/v1/fields', // Replace with your FieldController API URL
            method: 'GET',
            success: function (data) {
                const dropdown = $('#field-dropdownStaff');
                dropdown.empty(); // Clear existing options
                dropdown.append('<option selected>Open this select menu</option>'); // Default option

                // Populate dropdown with field codes
                data.forEach(function (field) {
                    dropdown.append(`<option value="${field.fieldCode}">${field.fieldCode}</option>`);
                });
            },
            error: function (xhr, status, error) {
                console.error("Error fetching FieldCodes:", error);
            }
        });
    }

    // Call the function to load field codes when the page loads
    loadFieldCodesForStaff();
});

/*Equipment drop down---------*/
$(document).ready(function () {
    // Fetch FieldCode data from FieldController and populate the dropdown
    function loadFieldCodesForEquipment() {
        $.ajax({
            url: 'http://localhost:8080/api/v1/fields', // Replace with your FieldController API URL
            method: 'GET',
            success: function (data) {
                const dropdown = $('#field-dropdownEquipment');
                dropdown.empty(); // Clear existing options
                dropdown.append('<option selected>Open this select menu</option>'); // Default option

                // Populate dropdown with field codes
                data.forEach(function (field) {
                    dropdown.append(`<option value="${field.fieldCode}">${field.fieldCode}</option>`);
                });
            },
            error: function (xhr, status, error) {
                console.error("Error fetching FieldCodes:", error);
            }
        });
    }

    // Call the function to load field codes when the page loads
    loadFieldCodesForEquipment();
});

/*log Drop down list--------*/
$(document).ready(function () {
    // Fetch FieldCode data from FieldController and populate the dropdown
    function loadFieldCodesForLog() {
        $.ajax({
            url: 'http://localhost:8080/api/v1/fields', // Replace with your FieldController API URL
            method: 'GET',
            success: function (data) {
                const dropdown = $('#field-dropdownLog');
                dropdown.empty(); // Clear existing options
                dropdown.append('<option selected>Open this select menu</option>'); // Default option

                // Populate dropdown with field codes
                data.forEach(function (field) {
                    dropdown.append(`<option value="${field.fieldCode}">${field.fieldCode}</option>`);
                });
            },
            error: function (xhr, status, error) {
                console.error("Error fetching FieldCodes:", error);
            }
        });
    }

    // Call the function to load field codes when the page loads
    loadFieldCodesForLog();
});

