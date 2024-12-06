$(document).ready(function () {
    let cropImageBase64 = '';

    // Convert file to Base64
    function convertToBase64(file, callback) {
        const reader = new FileReader();
        reader.onload = function (e) {
            callback(e.target.result);
        };
        reader.readAsDataURL(file);
    }

    // Handle file input for Crop Image
    $('#crop-Image').on('change', function (e) {
        const file = e.target.files[0];
        if (file) {
            convertToBase64(file, function (base64) {
                cropImageBase64 = base64;
                console.log("Crop Image Base64:", cropImageBase64);
            });
        }
    });

    // Save method
    $('#saveCropButton').on('click', function () {
        const cropFieldId = $('#field-dropdown').val(); // Simplified jQuery selection
        if (!cropFieldId) {
            alert('Please select a valid field.');
            return;
        }

        fetchField(cropFieldId, (field) => {

            const newCrop = {
                cropCode: $('#Crop-code').val(),
                commonName: $('#Crop-common-name').val(),
                scientificName: $('#Crop-scientific-name').val(),
                category: $('#Category').val(),
                season: $('#season').val(),
                fieldDTO: field,
                image: cropImageBase64 // Ensure cropImageBase64 is set
            };


            $.ajax({
                url: 'http://localhost:8080/api/v1/crops',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(newCrop),
                success: function () {
                    alert('Crop saved successfully!');
                    loadTableData(); // Ensure this function refreshes the table correctly
                },
                error: function (xhr, status, error) {
                    console.error("Error saving crop:", error);
                    alert('Failed to save crop. Please try again.');
                }
            });
        });
    });

    function fetchField(fieldId, callback) {
        $.ajax({
            url: `http://localhost:8080/api/v1/fields/${fieldId}`,
            method: "GET",
            success: function (field) {
                if (!field) {
                    alert("Field data is empty or invalid.");
                    return;
                }
                callback(field); // Pass the field data to the callback
            },
            error: function (xhr, status, error) {
                console.error("Error loading field:", error);
                alert("Failed to load field data. Please try again.");
            }
        });
    }



    // Update method
    $('#updateCropButton').on('click', function () {
        const updatedCrop = {
            cropCode: $('#Crop-code').val(),
            commonName: $('#Crop-common-name').val(),
            scientificName: $('#Crop-scientific-name').val(),
            category: $('#Category').val(),
            season: $('#season').val(),
            field: $('#field').val(),
            cropImage: cropImageBase64
        };

        $.ajax({
            url: `http://localhost:8080/api/v1/crops/${updatedCrop.cropCode}`, // Backend API URL
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updatedCrop),
            success: function () {
                alert('Crop updated successfully!');
                loadTableData();
            },
            error: function (xhr, status, error) {
                console.error("Error updating crop:", error);
            }
        });
    });

    // Delete method
    $('#deleteCropButton').on('click', function () {
        const cropCode = $('#Crop-code').val();

        if (cropCode) {
            $.ajax({
                url: `http://localhost:8080/api/v1/crops/${cropCode}`, // Backend API URL
                method: 'DELETE',
                success: function () {
                    alert('Crop deleted successfully!');
                    loadTableData();
                },
                error: function (xhr, status, error) {
                    console.error("Error deleting crop:", error);
                }
            });
        } else {
            alert('Please enter a Crop Code to delete.');
        }
    });

    // Load table data function
    function loadTableData() {
        $.ajax({
            url: 'http://localhost:8080/api/v1/crops', // Backend API URL
            method: 'GET',
            success: function (data) {
                let tableBody = '';
                data.forEach(function (crop) {
                    const fieldId = crop.fieldDTO ? crop.fieldDTO.id : 'N/A'; // Get Field ID or fallback
                    tableBody += `
                    <tr>
                        <td><input type="checkbox" class="listCheckbox"></td>
                        <td>${crop.cropCode}</td>
                        <td>${crop.commonName}</td>
                        <td>${crop.scientificName}</td>
                        <td>${crop.category}</td>
                        <td>${crop.season}</td>
                        <td>${fieldId}</td> <!-- Display Field ID -->
                        <td><img src="${crop.cropImage}" alt="Crop Image" style="width: 50px; height: 50px;"></td>
                    </tr>`;
                });
                $('.customtableCrop').html(tableBody);
            },
            error: function (xhr, status, error) {
                console.error("Error loading table data:", error);
            }
        });
    }

    // Initialize table data
    loadTableData();
});
