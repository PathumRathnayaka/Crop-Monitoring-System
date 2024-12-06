$(document).ready(function () {
    // Save method
    $('#saveStaffButton').on('click', function () {
        const cropFieldId = $('#field-dropdownStaff').val(); // Simplified jQuery selection
        if (!cropFieldId) {
            alert('Please select a valid field.');
            return;
        }

        fetchField(cropFieldId, (field) => {

            const newStaff = {
                id: $('#id').val(),
                firstName: $('#first-Name').val(),
                lastName: $('#last-Name').val(),
                designation: $('#designation').val(),
                gender: $('#gender').val(),
                joinedDate: $('#joinedDate').val(),
                dob: $('#dob').val(),
                address: $('#Address').val(),
                contact: $('#contact').val(),
                email: $('#email').val(),
                role: $('#role').val(),
                fields: field
            };
            console.log(newStaff);

            $.ajax({
                url: 'http://localhost:8080/api/v1/staffs', // Replace with your backend API URL
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(newStaff),
                success: function () {
                    alert('Staff saved successfully!');
                    loadTableData();
                },
                error: function (xhr, status, error) {
                    console.error("Error saving staff:", error);
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
    $('#updateStaffButton').on('click', function () {
        const updatedStaff = {
            id: $('#id').val(),
            firstName: $('#first-Name').val(),
            lastName: $('#last-Name').val(),
            designation: $('#designation').val(),
            gender: $('#gender').val(),
            joinedDate: $('#joined-Date').val(),
            dob: $('#dob').val(),
            address: $('#Address').val(),
            contact: $('#contact').val(),
            email: $('#email').val(),
            role: $('#role').val(),
            field: $('#field').val()
        };

        $.ajax({
            url: `http://localhost:8080/api/v1/staffs/${updatedStaff.id}`, // Replace with your backend API URL
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updatedStaff),
            success: function () {
                alert('Staff updated successfully!');
                loadTableData();
            },
            error: function (xhr, status, error) {
                console.error("Error updating staff:", error);
            }
        });
    });

    // Delete method
    $('#deleteStaffButton').on('click', function () {
        const staffId = $('#id').val();

        if (staffId) {
            $.ajax({
                url: `http://localhost:8080/api/v1/staffs/${staffId}`, // Replace with your backend API URL
                method: 'DELETE',
                success: function () {
                    alert('Staff deleted successfully!');
                    loadTableData();
                },
                error: function (xhr, status, error) {
                    console.error("Error deleting staff:", error);
                }
            });
        } else {
            alert('Please enter a Staff Id to delete.');
        }
    });

    // Load table data function
    function loadTableData() {
        $.ajax({
            url: 'http://localhost:8080/api/v1/staffs', // Replace with your backend API URL
            method: 'GET',
            success: function (data) {
                let tableBody = '';
                data.forEach(function (staff) {
                    tableBody += `
                        <tr>
                            <td><input type="checkbox" class="listCheckbox"></td>
                            <td>${staff.firstName}</td>
                            <td>${staff.lastName}</td>
                            <td>${staff.designation}</td>
                            <td>${staff.gender}</td>
                            <td>${staff.joinedDate}</td>
                            <td>${staff.dob}</td>
                            <td>${staff.address}</td>
                            <td>${staff.contact}</td>
                            <td>${staff.email}</td>
                            <td>${staff.role}</td>
                        </tr>`;
                });
                $('.customtableStaff').html(tableBody);
            },
            error: function (xhr, status, error) {
                console.error("Error loading staff data:", error);
            }
        });
    }

    // Initialize table data
    loadTableData();
});

/*toload equipment Drop down list--*/
$(document).ready(function () {
    // Fetch Staff ID data from StaffController and populate the dropdown
    function loadStaffIdsForEquipment() {
        $.ajax({
            url: 'http://localhost:8080/api/v1/staffs', // Replace with your StaffController API URL
            method: 'GET',
            success: function (data) {
                const dropdown = $('#staff-Equipment');
                dropdown.empty(); // Clear existing options
                dropdown.append('<option selected>Open this select menu</option>'); // Default option

                // Populate dropdown with staff IDs
                data.forEach(function (staff) {
                    dropdown.append(`<option value="${staff.id}">${staff.id}</option>`);
                });
            },
            error: function (xhr, status, error) {
                console.error("Error fetching Staff IDs:", error);
            }
        });
    }

    // Call the function to load staff IDs when the page loads
    loadStaffIdsForEquipment();
});
