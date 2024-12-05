$(document).ready(function () {
    // Save method
    $('#saveStaffButton').on('click', function () {
        const newStaff = {
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
        console.log(newStaff);

        $.ajax({
            url: '/api/v1/staffs', // Replace with your backend API URL
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
            url: `/api/v1/staffs/${updatedStaff.id}`, // Replace with your backend API URL
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
                url: `/api/v1/staffs/${staffId}`, // Replace with your backend API URL
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
            url: '/api/v1/staffs', // Replace with your backend API URL
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
