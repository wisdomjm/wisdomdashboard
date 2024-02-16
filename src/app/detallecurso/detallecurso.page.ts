import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap  } from "@angular/router";
import { AgregarCursosBDService } from 'src/app/services/agregar-cursos-bd.service';

@Component({
  selector: 'app-detallecurso',
  templateUrl: './detallecurso.page.html',
  styleUrls: ['./detallecurso.page.scss'],
})
export class DetallecursoPage implements OnInit {

  idCurso: string;
  cursos:any = {
    id: '',
    nombreCurso: '',
    categoria: '',
    descripcionCorta: '',
    descripcionLarga: '',
    numeroSubClases: 0,
    imagenCurso: ''
  };

  constructor(
    private route: ActivatedRoute,
    private recibirDatos: AgregarCursosBDService) { }

  ngOnInit() {
    //this.idCurso = this.route.snapshot.paramMap.get("idcurso");

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idCurso = params.get('idcurso');
      //console.log("EL ID DEL CURSO ES: ",this.idCurso);
    });
    this.CargarDetalleDelCurso(this.idCurso);
  }

  CargarDetalleDelCurso(id:any){
    this.recibirDatos.obtenerCursoDelaBaseDeDatos().subscribe(resp =>{
      //console.log('CURSOS: ', resp);
      //this.cursos = [];
      
      resp.forEach(value =>{
        if(value.id == id){
          const valores: any = {
            id: value.id,
            nombreCurso: value.nombreCurso,
            categoria: value.categoria,
            descripcionCorta: value.descripcionCorta,
            descripcionLarga: value.descripcionLarga,
            numeroSubClases: value.numeroSubClases,
            imagenCurso: value.imagenCurso
          }
          this.cursos.id = valores.id;
          this.cursos.nombreCurso = valores.nombreCurso;
          this.cursos.categoria = valores.categoria;
          this.cursos.descripcionCorta = valores.descripcionCorta;
          this.cursos.descripcionLarga = valores.descripcionLarga;
          this.cursos.numeroSubClases = valores.numeroSubClases;
          this.cursos.imagenCurso = valores.imagenCurso;
        }
      })
      
      //console.log("###############################################")
      //console.log("Los datos que obtengo son: ",this.cursos);
    })
  }

}
