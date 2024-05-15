class Controller {
  modelo: any;
  constructor(modelo: any) {
    this.modelo = modelo;
  }

  insertar = async (req: any, res: any) => {
    try {
      const response = await this.modelo.create(req.body);
      return res.status(200).json({ success: "true", response });
    } catch (error) {
      return res.status(400).json({ success: false, error });
    }
  };
  obtener = async (_req: any, res: any, extraOptions = {}) => {
    try {
      const response =
        typeof extraOptions === "function"
          ? await this.modelo.findAll()
          : await this.modelo.findAll(extraOptions);
      return res.status(200).json({ success: true, response });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  obtenerUno = async (req: any, res: any, target: string) => {
    try {
      const response = await this.modelo.findOne({
        where: { [target]: req.params[target] },
      });
      return res.status(200).json({ success: true, response });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };
  actualizar = async (
    req: any,
    res: any,
    variable: string,
    mensaje: string
  ) => {
    const id = req.params[variable];

    try {
      const response = await this.modelo.update(req.body, {
        where: { [variable]: id },
      });
      return res.status(200).json({ success: "true", response, msg: mensaje });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };
  eliminar = async (req: any, res: any, variable: string) => {
    const id = req.params[variable];
    try {
      const response = await this.modelo.destroy({
        where: { [variable]: id },
      });
      return res.status(200).json({ success: "true", response });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };
}
export default Controller;
