document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('uploadButton').addEventListener('click', uploadImage);
});

function uploadImage() {
    var fileInput = document.getElementById('imageUpload');
    var file = fileInput.files[0];

    if (file) {
        var formData = new FormData();
        formData.append('file', file);

        fetch('http://127.0.0.1:8000/predict/', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            var resultDiv = document.getElementById('result');
            resultDiv.innerText = data.message;
        })
        .catch(error => {
            console.error('Error:', error);
            var resultDiv = document.getElementById('result');
            resultDiv.innerText = 'An error occurred. Please try again.';
        });
    } else {
        alert('Please select an image file.');
    }
}
// document.addEventListener('DOMContentLoaded', function() {
//     document.getElementById('checkButton').addEventListener('click', checkImage);
// });

// function checkImage() {
//     var imageUrlInput = document.getElementById('imageUrlInput');
//     var imageUrl = imageUrlInput.value;

//     if (imageUrl.trim() !== '') {
//         fetch('http://127.0.0.1:8000/predict/', {
//             method: 'POST',
//             body: JSON.stringify({ imageUrl }),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//         .then(response => response.json())
//         .then(data => {
//             var resultDiv = document.getElementById('result');
//             resultDiv.innerText = data.message;
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             var resultDiv = document.getElementById('result');
//             resultDiv.innerText = 'An error occurred. Please try again.';
//         });
//     } else {
//         alert('Please enter an image URL.');
//     }
// }
