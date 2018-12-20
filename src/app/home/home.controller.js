import Icons from 'uikit/dist/js/uikit-icons';
import UIkit from 'uikit/dist/js/uikit.js';

export default class HomeController {
  /**
   * Dependency injection
   * @param  {[type]} $state
   * @param  {[type]} $http
   * @param  {[type]} $templateCache
   */
  constructor($state, $http, $templateCache) {
    /*
  		Obtener el año actual  
  	 */
    this.getCurrentYear = (new Date()).getFullYear();
    this.getCurrentMonth = (new Date()).getMonth();
    this.getCurrentDay = (new Date()).getDate();
    /*
    	Inicializa el form de guardar un shipment con valores por defecto
     */
    this.form = { status: 'inprogress', category: '', offer: '', day: this.getCurrentDay, month: this.getCurrentMonth, year: this.getCurrentYear, selected: false };
    /**
     * Webpack require para ubicar en el directorio actual
     * @type {[type]}
     */
    this.stringUrl = $templateCache.put("modal.tpl.html", require("./modal.tpl.html"));
    this.radios = [{ name: 'sale', value: false }, { name: 'priority', value: false }, { name: 'bookmark', value: false }];
    /*
      Titulos del menu izquierda
    */
    this.title = "Smart Filters";
    this.status_text = "Status";
    this.status = [{ name: 'In progress', color: '#F2B039' }, { name: 'Delivered', color: '#57BF7D' }];
    /**
     * Define el modelo de los switcher, estados y los iconos
     * @type {Object}
     */
    this.switcher = {
      data: [{ id: 0, model: 'sale', icon: '/img/sale.png', value: false },
        { id: 1, model: 'priority', icon: '/img/clock.png', value: false },
        { id: 2, model: 'bookmarked', icon: '/img/heart.png', value: false }
      ]
    }
    /**
     * Array de los viajes
     * @type {array}
     */
    this.shipments = [];
    /**
     * Dependencias inicializadas
     * @type {[$state]}
     * @type {[$http]}
     */
    this.state = $state;
    this.http = $http;
    this.templateCache = $templateCache;
    this.filters = { switcher: '', select: '' };
    /**
     * Renderiza las tarjetas de los viajes
     */
    this.defaultValues();
    this.calendar();
    this.fetch();
  }
  /**
   * Redirecciona a la ruta que recibe
   * @param  {string}
   */
  goTo(route) {
    this.state.go(route.toString());
  }
  /**
   * Escucha los eventos de los switcher y cambia sus estados
   * @param  {object}
   */
  handleSwitcher(evt) {
    if (this.switcher.data[0].value == false && this.switcher.data[1].value == false && this.switcher.data[2].value == false) {
      console.log("entonces");
    }
    this.filters.switcher = evt.model;
    this.switcher.data.map((item) => item.id != evt.id ? item.value = false : null);

  }
  /**
   * Escucha los eventos sobre los select y cambia sus estados
   * @return
   */
  handleSelect() {
    if (this.select.name == "All") {
      this.filters.switcher = "";
      this.filters.select = "";
      this.switcher = {
        data: [{ id: 0, model: 'sale', icon: '/img/sale.png', value: false },
          { id: 1, model: 'priority', icon: '/img/clock.png', value: false },
          { id: 2, model: 'bookmarked', icon: '/img/heart.png', value: false }
        ]
      }
    } else {
      this.filters.select = this.select.name;
    }

    this.filter_status_text = this.select.name;
    this.filter_status_color = this.select.color;
  }
  calendar() {
    /*
    	Evitar continuar si no se ha definido el anio
     */
    if (!this.getCurrentYear) {
      return;
    }
    /*
      Definir dias, meses y años para elegir en los select 
      Teniendo en cuenta que sea a futuro la fecha elegida
     */
    this.days = this.getCurrentYear == this.form.year ? Array.from(Array(32 - this.getCurrentDay), (d, i) => this.getCurrentDay + i) : Array.from(Array(31), (d, i) => i + 1);
    this.months = this.getCurrentYear == this.form.year ? Array.from(Array(13 - this.getCurrentMonth), (d, i) => this.getCurrentMonth + i) : Array.from(Array(12), (d, i) => i + 1);
    this.years = [this.getCurrentYear, this.getCurrentYear + 1];
  }
  /**
   * Mock de un JSON con los viajes
   * @return {[object]}
   */
  fetch() {
    console.log("Fetched values!");
    this.http.get('data.json').then((result) => this.shipments = result.data);
  }
  /*
   Mostrar modal de crear shipment
   */
  openModal() {
    UIkit.modal("#savecard").show();
  }
  /*
   Limpiar form
   */
  defaultValues() {
    this.form = { status: 'In Progress', category: '', offer: '', day: this.getCurrentDay, month: this.getCurrentMonth, year: this.getCurrentYear, selected: false };
  }
  /*
	Guardar el nuevo shipment en el arreglo en memoria
   */
  save(shipmentform) {
  	UIkit.notification.closeAll();
  	if(shipmentform.$invalid) return UIkit.notification({message: 'Something is wrong', status: 'danger'});
    this.form.date = this.form.day + '/' + this.form.month + '/' + this.form.year;
    this.form.id = Math.floor(Math.random() * 100000);
    this.form.title = this.form.origin + ' - ' + this.form.destination;
    if (this.shipments.push(this.form) > 0) {
      this.defaultValues();
      UIkit.modal("#savecard").hide();
      UIkit.notification({message: 'New shipment created!', status: 'success'});
    }
  }
  delete(shipment){
    UIkit.notification.closeAll();
    this.shipments = this.shipments.filter((item) => item.id != shipment.id);
    UIkit.notification({message: 'Shipment deleted!', status: 'success'});
  }
  deleteSelected(){
    UIkit.notification.closeAll();
    this.shipments = this.shipments.filter((item) => !item.selected);
    UIkit.notification({message: 'Shipments deleted!', status: 'success'});
  }
}
