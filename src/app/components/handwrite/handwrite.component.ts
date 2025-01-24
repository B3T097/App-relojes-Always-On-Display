import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-handwrite',
  templateUrl: './handwrite.component.html',
  styleUrls: ['./handwrite.component.scss'],
})
export class HandwriteComponent  implements OnInit {
  dias = signal<string[]>([
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ]);

  meses = signal<string[]>([
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]);
  
  constructor() { }

  ngOnInit() {
    const hora = document.querySelector("#hora") as HTMLElement;
    const segundero = document.querySelector("#segundos") as HTMLElement;
    const fecha = document.querySelector(".fecha") as HTMLElement;

    setInterval(() => {
      if (hora != null && segundero != null) {
        this.actualizarHora(hora, segundero); 
      }
      if (fecha != null) {
        this.actualizarFecha(fecha);
      }
    }, 1000);
  }

  actualizarHora(hora: HTMLElement, segundero: HTMLElement): void {
    const fechaActual = new Date();
    const horaActual = fechaActual.getHours(); //24 horas;
    const horaActualDoce = horaActual > 12 ? horaActual - 12 : horaActual;
    const horaDoceConCero =
      horaActualDoce < 10 ? `0${horaActualDoce}` : horaActualDoce;
    const minutos = fechaActual.getMinutes();
    const minutosCero = (minutos < 10 ? `0${minutos}` : minutos);
    const segundos = fechaActual.getSeconds();
    hora.textContent = `${horaDoceConCero}:${minutosCero}`;
    segundero.textContent = segundos < 10 ? `0${segundos}` : `${segundos}`;
  };

  actualizarFecha(fecha: HTMLElement): void {
    const fechaActual = new Date();
    const dia = fechaActual.getDay();
    const numeroDia = fechaActual.getDate();
    const mes = fechaActual.getMonth();
    const anio = fechaActual.getFullYear();
    fecha.textContent = `${this.dias()[dia]}, ${numeroDia} de ${this.meses()[mes]} del ${anio}`;
  };

}
