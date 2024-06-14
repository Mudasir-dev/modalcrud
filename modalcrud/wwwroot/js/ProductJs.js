$(document).ready(function () {
    GetProducts();
});

function GetProducts() {
    $.ajax({
        url: '/Product/GetProducts',
        type: 'get',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        success: function (response) {
            if (response == null || response == undefined || response.length == 0) {

                var object = '';
                object += '<tr>';
                object += '<td colspan="5">' + 'Products Not Available' + '</td>';
                object += '</tr>';

                $('#tbleBody').html(object);
            } else {
                var object = '';
                $.each(response, function (index, item) {
                    object += '<tr>';
                    object += '<td>' + item.id + '</td>';
                    object += '<td>' + item.productName + '</td>';
                    object += '<td>' + item.price + '</td>';
                    object += '<td>' + item.qty + '</td>';
                    object += '<td><a href="#" class="btn btn-primary btn-sam" onclick="Edit(' + item.id + ')">Edit</a><a href="#" class="btn btn-danger ms-2 btn-sam" onclick="Delete(' + item.id + ')">Delete</a></td>';
                    object += '</tr>';
                });
                $('#tbleBody').html(object);
            }
        },
        error: function () {
            alert('Unable To Read The Data');
        }
    });
}

$('#btnAdd').click(function () {
    $('#ProductModal').modal('show');
    $('#modalTitle').text('Add Product12');
});

function Insert() {

    var result = Validate();

    if (result == false) {
        return false;
    }
    var formData = new Object;
    formData.id = $('#Id').val();
    formData.productName = $('#ProductName').val();
    formData.price = $('#Price').val();
    formData.qty = $('#qty').val();

    $.ajax({
        url: '/Product/Insert',
        data: formData,
        type: 'post',
        success: function (response) {
            if (response == null || response == undefined || response.length == 0) {
                alert('Unable to save the data.');
            }
            else {
                HideModal();
                GetProducts();

                alert(response);
            }
        },
        error: function () {
            alert('Unable to save the data.');
        }

    });
}


function HideModal() {
    ClearData();
    $('#ProductModal').modal('hide');

}

function ClearData() {
    $('#ProductName').val('');
    $('#Price').val('');
    $('#qty').val('');

    $('#ProductName').css('border-color', 'lightgrey');
    $('#Price').css('border-color', 'lightgrey');
    $('#qty').css('border-color', 'lightgrey');

}

function Validate() {
    var isValid = true;

    if ($('#ProductName').val().trim() == "") {
        $('#ProductName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ProductName').css('border-color', 'lightgrey');

    }

    if ($('#Price').val().trim() == "") {
        $('#Price').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Price').css('border-color', 'lightgrey');

    }

    if ($('#qty').val().trim() == "") {
        $('#qty').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#qty').css('border-color', 'lightgrey');

    }

    return isValid;
}

$('#ProductName').change(function () {
    Validate();

});

$('#Price').change(function () {
    Validate();

});

$('#qty').change(function () {
    Validate();

});

function Edit(id) {
    $.ajax({
        url: 'Product/Edit?id=' + id ,
        type : 'get',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function (response) {
            if (response == null || response == undefined) {
                alert('Unable to read the data');
            }
            else if (response.length == 0) {
                alert('Data not found with id' + id);
            }
            else {
                $('#ProductModal').modal('show');
                $('#modalTitle').text('Edit Product');
                $('#Save').css('display' , 'flex');
                $('#Update').css('display', 'flex');
                $('#Id').val(response.id);
                $('#ProductName').val(response.productName);
                $('#Price').val(response.price);
                $('#qty').val(response.qty);

            }
        },
        error: function () {
            alert('Unable to read the data');

        }

    });
}

function Update() {
    var result = Validate();

    if (result == false) {
        return false;
    }

    var formData = new Object();
    var formData = new Object;
    formData.id = $('#Id').val();
    formData.productName = $('#ProductName').val();
    formData.price = $('#Price').val();
    formData.qty = $('#qty').val();

    $.ajax({
        url: '/Product/Update',
        data: formData,
        type: 'post',
        success: function (response) {
            if (response == null || response == undefined || response.length == 0) {
                alert('Unable to save the data.');
            }
            else {
                HideModal();
                GetProducts();

                alert(response);
            }
        },
        error: function () {
            alert('Unable to save the data.');
        }

    });
}

function Delete(id) {
    if (confirm('Are you sure you want to delete this record?')) {
        $.ajax({
            url: 'Product/Delete?id=' + id,
            type: 'post',
            success: function (response) {
                if (response == null || response == undefined) {
                    alert('Unable to delete the data');
                }
                else if (response.length == 0) {
                    alert('Data not found with id' + id);
                }
                else {
                    GetProducts();
                    alert(response);

                }
            },
            error: function () {
                alert('Unable to read the data');

            }

        });
    }

}