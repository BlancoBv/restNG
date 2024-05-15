"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Controller {
    constructor(modelo) {
        this.insertar = async (req, res) => {
            try {
                const response = await this.modelo.create(req.body);
                return res.status(200).json({ success: "true", response });
            }
            catch (error) {
                return res.status(400).json({ success: false, error });
            }
        };
        this.obtener = async (_req, res, extraOptions = {}) => {
            try {
                const response = typeof extraOptions === "function"
                    ? await this.modelo.findAll()
                    : await this.modelo.findAll(extraOptions);
                return res.status(200).json({ success: true, response });
            }
            catch (error) {
                return res.status(400).json({ error });
            }
        };
        this.obtenerUno = async (req, res, target) => {
            try {
                const response = await this.modelo.findOne({
                    where: { [target]: req.params[target] },
                });
                return res.status(200).json({ success: true, response });
            }
            catch (error) {
                return res.status(400).json({ error });
            }
        };
        this.actualizar = async (req, res, variable, mensaje) => {
            const id = req.params[variable];
            try {
                const response = await this.modelo.update(req.body, {
                    where: { [variable]: id },
                });
                return res.status(200).json({ success: "true", response, msg: mensaje });
            }
            catch (error) {
                return res.status(400).json({ error });
            }
        };
        this.eliminar = async (req, res, variable) => {
            const id = req.params[variable];
            try {
                const response = await this.modelo.destroy({
                    where: { [variable]: id },
                });
                return res.status(200).json({ success: "true", response });
            }
            catch (error) {
                return res.status(400).json({ error });
            }
        };
        this.modelo = modelo;
    }
}
exports.default = Controller;
