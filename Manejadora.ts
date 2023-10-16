namespace PrimerParcial{

    const xhttp : XMLHttpRequest = new XMLHttpRequest();
    const formData : FormData = new FormData();
    export class Manejadora implements Iparte2 , Iparte3

    {
        public static AgregarNeumaticoJSON(){

            let marca : string = (<HTMLInputElement> document.getElementById("marca")).value;
            let medidas: string = (<HTMLInputElement> document.getElementById("medidas")).value;
            let precio: number = (Number)((<HTMLInputElement> document.getElementById("precio")).value);
        
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
            }
        }//fin AgregarNeumaticoJSON()

        public static MostrarNeumaticosJSON(){

            xhttp.open("GET", "./backend/listadoNeumaticosJSON.php", true);
                
            xhttp.send();

            xhttp.onreadystatechange = () => {

                if (xhttp.readyState == 4 && xhttp.status == 200) {

                    console.log(xhttp.responseText);
                    let objet : any = JSON.parse(xhttp.responseText);
                    let tabla : string =" <TABLE BORDER><TR><TH>Marca</TH> <TH>Medidas</TH> <TH>Precio</TH></TR>";

                    for (let index = 0; index < objet.length; index++) {
                        tabla += `<TR><TD>${objet[index]._marca}</TD> <TD>${objet[index]._medidias}</TD> <TD>${objet[index]._precio}</TD> </TR>`;                    
                    }

                    tabla += `</TABLE>`;
                    (<HTMLInputElement> document.getElementById("divTabla")).innerHTML = tabla;
                }
            }
        }//fin MostrarNeumaticosJSON()

        public static VerificarNeumaticoJSON() {

            xhttp.open("POST", "./backend/verificarNeumaticoJSON.php", true);
                
            let marca: string = (<HTMLInputElement> document.getElementById("marca")).value;
            let medidas: string = (<HTMLInputElement> document.getElementById("medidas")).value;

            formData.append('marca', marca);
            formData.append('medidas', medidas);
                
            xhttp.send(formData);

            xhttp.onreadystatechange = () => {

                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    alert(xhttp.responseText);
                    console.log(xhttp.responseText);
                }

            }
        }//fin VerificarNeumaticoJSON()


        //------BD---------------------------------------------------------------------------------------------------------
        
        
        public static AgregarNeumaticoSinFoto() {
            
            let marca : string = (<HTMLInputElement> document.getElementById("marca")).value;
            let medidas: string = (<HTMLInputElement> document.getElementById("medidas")).value;
            let precio: number = (Number)((<HTMLInputElement> document.getElementById("precio")).value);
        
            xhttp.open("POST", "./backend/agregarNeumaticoSinFoto.php", true);

            let neumatico = {

                marca: marca,
                medidas: medidas,
                precio:precio
                
            };
            formData.append('neumatico_json', JSON.stringify(neumatico));
            xhttp.send(formData);

            xhttp.onreadystatechange = () => {

                if (xhttp.readyState == 4 && xhttp.status == 200) {

                    alert(xhttp.responseText);
                    console.log(xhttp.responseText);
                }
            }
        }//fin AgregarNeumaticoSinFoto()


        public static MostrarNeumaticosBD(){

            xhttp.open("GET", "./backend/listadoNeumaticoBD.php", true);
                
            xhttp.send();

            xhttp.onreadystatechange = () => {

                if (xhttp.readyState == 4 && xhttp.status == 200) {

                    console.log(xhttp.responseText);
                    let objet : any = JSON.parse(xhttp.responseText);
                    let tabla : string =" <TABLE BORDER><TR><TH>id</TH><TH>Marca</TH> <TH>Medidas</TH> <TH>Precio</TH> <TH>PATH FOTO</TH> <TH>FOTO</TH>  <TH>ACCIONES</TH></TR>";
                    for (let index = 0; index < objet.length; index++) {
                        tabla += `<TR><TD>${objet[index].id}</TD><TD>${objet[index].marca}</TD> <TD>${objet[index].medidas}</TD> <TD>${objet[index].precio}</td><td> ${objet[index].foto} </td><td> <img src=\"${objet[index].foto}\" width=\"50\" height=\"50\" /> </td>
                        <td><input type="button" value="Llenar datos" name="btn-llenarDatos" data-obj= ${JSON.stringify(objet[index])}
                        ></td></TD> </TR>`;                    
                    }
                    tabla += `</TABLE>`;            
                    (<HTMLInputElement> document.getElementById("divTabla")).innerHTML = tabla;
                    
                    document.getElementsByName("btn-llenarDatos").forEach(element => 
                    {
                        element.addEventListener("click", () =>
                        {
                            let json : any = element.getAttribute("data-obj");
                            let obj : any = JSON.parse(json);
                
                            (<HTMLInputElement>document.getElementById("idNeumatico")).value = obj.id;
                            (<HTMLInputElement>document.getElementById("marca")).value = obj.marca;
                            (<HTMLInputElement>document.getElementById("medidas")).value = obj.medidas;
                            (<HTMLInputElement>document.getElementById("precio")).value = obj.precio; 
                        }
                        );
                    });
                }
            }
        }//fin MostrarNeumaticosBD()

        
        public static ModificarNeumatico(){

            let funccion = new Manejadora();

            funccion.ModificarNeumatico();

        }//fin  ModificarNeumatico()


        public static EliminarNeumatico(){

            let funccion = new Manejadora();

            funccion.EliminarNeumatico();

        }//fin  EliminarNeumatico()


        public static VerificarNeumaticoBD(){

            let funccion = new Manejadora();

            funccion.VerificarNeumaticoBD();
        }//fin  VerificarNeumaticoBD()

        public static AgregarNeumaticoFoto(){

            let funccion = new Manejadora();

            funccion.AgregarNeumaticoFoto();

        }//fin  AgregarNeumaticoFoto()

        public static BorrarNeumaticoFoto(){

            let funccion = new Manejadora();

            funccion.BorrarNeumaticoFoto();

        }//fin  BorrarNeumaticoFoto()

        public static ModificarNeumaticoBDFoto(){

            let funccion = new Manejadora();

            funccion.ModificarNeumaticoBDFoto();
        }

        EliminarNeumatico() {

            xhttp.open("POST", "./backend/eliminarNeumaticoBD.php", true);
                
            let marca : string = (<HTMLInputElement> document.getElementById("marca")).value;
            let medidas: string = (<HTMLInputElement> document.getElementById("medidas")).value;
            let precio: number = (Number)((<HTMLInputElement> document.getElementById("precio")).value);
            let id: number = (Number)((<HTMLInputElement> document.getElementById("idNeumatico")).value);

            if(window.confirm("Seguro quieres eliminar el neumatico marca?: " + marca + " medida: " + medidas)){

                let neumatico = {
                    marca: marca,
                    medidas: medidas,
                    precio:precio,
                    id:id
                };
    
                formData.append('neumatico_json', JSON.stringify(neumatico));
                xhttp.send(formData);
    
                xhttp.onreadystatechange = () => {

                    if (xhttp.readyState == 4 && xhttp.status == 200) {

                        console.log(xhttp.responseText);
                        alert(xhttp.responseText);
                        Manejadora.MostrarNeumaticosBD();
                    }
                }
            }
        }//fin  EliminarNeumatico()

        ModificarNeumatico(){

            xhttp.open("POST", "./backend/modificarNeumaticoBD.php", true);
                
            let marca : string = (<HTMLInputElement> document.getElementById("marca")).value;
            let medidas: string = (<HTMLInputElement> document.getElementById("medidas")).value;
            let precio: number = (Number)((<HTMLInputElement> document.getElementById("precio")).value);
            let id: number = (Number)((<HTMLInputElement> document.getElementById("idNeumatico")).value);
         
            let neumatico = {
                marca: marca,
                medidas: medidas,
                precio:precio,
                id:id
            };

            formData.append('neumatico_json', JSON.stringify(neumatico));
            xhttp.send(formData);

            xhttp.onreadystatechange = () => {

                if (xhttp.readyState == 4 && xhttp.status == 200) {

                    let objet : any = JSON.parse(xhttp.responseText);

                    if(objet.exito){ 

                        Manejadora.MostrarNeumaticosBD();
                    }else{
                        console.log(objet.mensaje);
                        alert(objet.mensaje);
                    }
                }
            }
        }//fin  ModificarNeumatico()

        VerificarNeumaticoBD() : any{

            let marca : string = (<HTMLInputElement> document.getElementById("marca")).value;
            let medidas: string = (<HTMLInputElement> document.getElementById("medidas")).value;
            
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
            }
        }//fin VerificarNeumaticoBD()

        AgregarNeumaticoFoto() : any{

            let marca : string = (<HTMLInputElement> document.getElementById("marca")).value;
            let medidas: string = (<HTMLInputElement> document.getElementById("medidas")).value;
            let precio: number = (Number)((<HTMLInputElement> document.getElementById("precio")).value);
            let foto: any = (<HTMLInputElement> document.getElementById("foto"));
        
            xhttp.open("POST", "./backend/agregarNeumaticoBD.php", true);

            formData.append('marca', marca);
            formData.append('medidas', medidas);
            formData.append('precio', precio.toString())
            formData.append('foto', foto.files[0]);
            xhttp.setRequestHeader("enctype", "multipart/form-data");
            xhttp.send(formData);

            xhttp.onreadystatechange = () => {

                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    alert(xhttp.responseText);
                    console.log(xhttp.responseText);
                    Manejadora.MostrarNeumaticosBD();
                }
            }
        }//fin AgregarNeumaticoFoto()

        BorrarNeumaticoFoto() : any{

            xhttp.open("POST", "./backend/eliminarNeumaticoBDFoto.php", true);
                
            let marca : string = (<HTMLInputElement> document.getElementById("marca")).value;
            let medidas: string = (<HTMLInputElement> document.getElementById("medidas")).value;
            let precio: number = (Number)((<HTMLInputElement> document.getElementById("precio")).value);
            let id: number = (Number)((<HTMLInputElement> document.getElementById("idNeumatico")).value);
            let foto: any = (<HTMLInputElement> document.getElementById("foto"));

            if(window.confirm("Seguro quieres eliminar el neumatico marca: " + marca + " medida: " + medidas))
            {
                let neumatico = {
                    marca: marca,
                    medidas: medidas,
                    precio:precio,
                    id:id
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
                }
            }

        }//fin  BorrarNeumaticoFoto() 
        
        ModificarNeumaticoBDFoto() : any
        {

        }
    }
}