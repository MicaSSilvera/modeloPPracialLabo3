"use strict";
var PrimerParcial;
(function (PrimerParcial) {
    const xhttp = new XMLHttpRequest();
    const formData = new FormData();
    class Manejadora {
        static AgregarNeumaticoJSON() {
            let marca = document.getElementById("marca").value;
            let medidas = document.getElementById("medidas").value;
            let precio = (Number)(document.getElementById("precio").value);
            xhttp.open("POST", "./backend/altaNeumaticoJSON.php", true);
            formData.append('marca', marca);
            formData.append('medidas', medidas);
            formData.append('precio', precio.toString());
            xhttp.send(formData);
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    alert(xhttp.responseText);
                    console.log(xhttp.responseText);
                }
            };
        } //fin AgregarNeumaticoJSON()
        static MostrarNeumaticosJSON() {
            xhttp.open("GET", "./backend/listadoNeumaticosJSON.php", true);
            xhttp.send();
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    let objet = JSON.parse(xhttp.responseText);
                    let tabla = " <TABLE BORDER><TR><TH>Marca</TH> <TH>Medidas</TH> <TH>Precio</TH></TR>";
                    for (let index = 0; index < objet.length; index++) {
                        tabla += `<TR><TD>${objet[index]._marca}</TD> <TD>${objet[index]._medidias}</TD> <TD>${objet[index]._precio}</TD> </TR>`;
                    }
                    tabla += `</TABLE>`;
                    document.getElementById("divTabla").innerHTML = tabla;
                }
            };
        } //fin MostrarNeumaticosJSON()
        static VerificarNeumaticoJSON() {
            xhttp.open("POST", "./backend/verificarNeumaticoJSON.php", true);
            let marca = document.getElementById("marca").value;
            let medidas = document.getElementById("medidas").value;
            formData.append('marca', marca);
            formData.append('medidas', medidas);
            xhttp.send(formData);
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    alert(xhttp.responseText);
                    console.log(xhttp.responseText);
                }
            };
        } //fin VerificarNeumaticoJSON()
        //------BD---------------------------------------------------------------------------------------------------------
        static AgregarNeumaticoSinFoto() {
            let marca = document.getElementById("marca").value;
            let medidas = document.getElementById("medidas").value;
            let precio = (Number)(document.getElementById("precio").value);
            xhttp.open("POST", "./backend/agregarNeumaticoSinFoto.php", true);
            let neumatico = {
                marca: marca,
                medidas: medidas,
                precio: precio
            };
            formData.append('neumatico_json', JSON.stringify(neumatico));
            xhttp.send(formData);
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    alert(xhttp.responseText);
                    console.log(xhttp.responseText);
                }
            };
        } //fin AgregarNeumaticoSinFoto()
        static MostrarNeumaticosBD() {
            xhttp.open("GET", "./backend/listadoNeumaticoBD.php", true);
            xhttp.send();
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    let objet = JSON.parse(xhttp.responseText);
                    let tabla = " <TABLE BORDER><TR><TH>id</TH><TH>Marca</TH> <TH>Medidas</TH> <TH>Precio</TH> <TH>PATH FOTO</TH> <TH>FOTO</TH>  <TH>ACCIONES</TH></TR>";
                    for (let index = 0; index < objet.length; index++) {
                        tabla += `<TR><TD>${objet[index].id}</TD><TD>${objet[index].marca}</TD> <TD>${objet[index].medidas}</TD> <TD>${objet[index].precio}</td><td> ${objet[index].foto} </td><td> <img src=\"${objet[index].foto}\" width=\"50\" height=\"50\" /> </td>
                        <td><input type="button" value="Llenar datos" name="btn-llenarDatos" data-obj= ${JSON.stringify(objet[index])}
                        ></td></TD> </TR>`;
                    }
                    tabla += `</TABLE>`;
                    document.getElementById("divTabla").innerHTML = tabla;
                    document.getElementsByName("btn-llenarDatos").forEach(element => {
                        element.addEventListener("click", () => {
                            let json = element.getAttribute("data-obj");
                            let obj = JSON.parse(json);
                            document.getElementById("idNeumatico").value = obj.id;
                            document.getElementById("marca").value = obj.marca;
                            document.getElementById("medidas").value = obj.medidas;
                            document.getElementById("precio").value = obj.precio;
                        });
                    });
                }
            };
        } //fin MostrarNeumaticosBD()
        static ModificarNeumatico() {
            let funccion = new Manejadora();
            funccion.ModificarNeumatico();
        } //fin  ModificarNeumatico()
        static EliminarNeumatico() {
            let funccion = new Manejadora();
            funccion.EliminarNeumatico();
        } //fin  EliminarNeumatico()
        static VerificarNeumaticoBD() {
            let funccion = new Manejadora();
            funccion.VerificarNeumaticoBD();
        } //fin  VerificarNeumaticoBD()
        static AgregarNeumaticoFoto() {
            let funccion = new Manejadora();
            funccion.AgregarNeumaticoFoto();
        } //fin  AgregarNeumaticoFoto()
        static BorrarNeumaticoFoto() {
            let funccion = new Manejadora();
            funccion.BorrarNeumaticoFoto();
        } //fin  BorrarNeumaticoFoto()
        static ModificarNeumaticoBDFoto() {
            let funccion = new Manejadora();
            funccion.ModificarNeumaticoBDFoto();
        }
        EliminarNeumatico() {
            xhttp.open("POST", "./backend/eliminarNeumaticoBD.php", true);
            let marca = document.getElementById("marca").value;
            let medidas = document.getElementById("medidas").value;
            let precio = (Number)(document.getElementById("precio").value);
            let id = (Number)(document.getElementById("idNeumatico").value);
            if (window.confirm("Seguro quieres eliminar el neumatico marca?: " + marca + " medida: " + medidas)) {
                let neumatico = {
                    marca: marca,
                    medidas: medidas,
                    precio: precio,
                    id: id
                };
                formData.append('neumatico_json', JSON.stringify(neumatico));
                xhttp.send(formData);
                xhttp.onreadystatechange = () => {
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                        console.log(xhttp.responseText);
                        alert(xhttp.responseText);
                        Manejadora.MostrarNeumaticosBD();
                    }
                };
            }
        } //fin  EliminarNeumatico()
        ModificarNeumatico() {
            xhttp.open("POST", "./backend/modificarNeumaticoBD.php", true);
            let marca = document.getElementById("marca").value;
            let medidas = document.getElementById("medidas").value;
            let precio = (Number)(document.getElementById("precio").value);
            let id = (Number)(document.getElementById("idNeumatico").value);
            let neumatico = {
                marca: marca,
                medidas: medidas,
                precio: precio,
                id: id
            };
            formData.append('neumatico_json', JSON.stringify(neumatico));
            xhttp.send(formData);
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let objet = JSON.parse(xhttp.responseText);
                    if (objet.exito) {
                        Manejadora.MostrarNeumaticosBD();
                    }
                    else {
                        console.log(objet.mensaje);
                        alert(objet.mensaje);
                    }
                }
            };
        } //fin  ModificarNeumatico()
        VerificarNeumaticoBD() {
            let marca = document.getElementById("marca").value;
            let medidas = document.getElementById("medidas").value;
            let neumatico = {
                marca: marca,
                medidas: medidas,
            };
            xhttp.open("POST", "./backend/verificarNeumaticoBD.php", true);
            formData.append('obj_neumatico', JSON.stringify(neumatico));
            xhttp.send(formData);
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    alert(xhttp.responseText);
                }
            };
        } //fin VerificarNeumaticoBD()
        AgregarNeumaticoFoto() {
            let marca = document.getElementById("marca").value;
            let medidas = document.getElementById("medidas").value;
            let precio = (Number)(document.getElementById("precio").value);
            let foto = document.getElementById("foto");
            xhttp.open("POST", "./backend/agregarNeumaticoBD.php", true);
            formData.append('marca', marca);
            formData.append('medidas', medidas);
            formData.append('precio', precio.toString());
            formData.append('foto', foto.files[0]);
            xhttp.setRequestHeader("enctype", "multipart/form-data");
            xhttp.send(formData);
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    alert(xhttp.responseText);
                    console.log(xhttp.responseText);
                    Manejadora.MostrarNeumaticosBD();
                }
            };
        } //fin AgregarNeumaticoFoto()
        BorrarNeumaticoFoto() {
            xhttp.open("POST", "./backend/eliminarNeumaticoBDFoto.php", true);
            let marca = document.getElementById("marca").value;
            let medidas = document.getElementById("medidas").value;
            let precio = (Number)(document.getElementById("precio").value);
            let id = (Number)(document.getElementById("idNeumatico").value);
            let foto = document.getElementById("foto");
            if (window.confirm("Seguro quieres eliminar el neumatico marca: " + marca + " medida: " + medidas)) {
                let neumatico = {
                    marca: marca,
                    medidas: medidas,
                    precio: precio,
                    id: id
                };
                formData.append('foto', foto.files[0]);
                xhttp.setRequestHeader("enctype", "multipart/form-data");
                formData.append('neumatico_json', JSON.stringify(neumatico));
                xhttp.send(formData);
                xhttp.onreadystatechange = () => {
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                        console.log(xhttp.responseText);
                        alert(xhttp.responseText);
                        Manejadora.MostrarNeumaticosBD();
                    }
                };
            }
        } //fin  BorrarNeumaticoFoto() 
        ModificarNeumaticoBDFoto() {
        }
    }
    PrimerParcial.Manejadora = Manejadora;
})(PrimerParcial || (PrimerParcial = {}));
//# sourceMappingURL=Manejadora.js.map