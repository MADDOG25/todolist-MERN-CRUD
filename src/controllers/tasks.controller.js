import Task from "../models/task.model.js"; // Importa el modelo de tarea

export const getTasks = async (req, res) => {
  try {
    // Utiliza el método find para obtener todas las tareas del usuario actual
    const tasks = await Task.find({ user: req.user.id }).populate("user");
    res.json(tasks);
  } catch (error) {
    // Maneja los errores si ocurren
    console.error("Error al obtener tareas:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const createTask = async (req, res) => {
  try {
    // Extrae los datos del cuerpo de la solicitud
    const { title, description, date } = req.body;

    // Crea una nueva tarea utilizando los datos proporcionados
    const newTask = new Task({
      title,
      description,
      date,
      user: req.user.id,
    });

    // Guarda la nueva tarea en la base de datos
    const savedTask = await newTask.save();

    // Devuelve la tarea creada en la respuesta
    res.status(201).json(savedTask);
  } catch (error) {
    // Maneja los errores si ocurren
    console.error("Error al crear tarea:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getTask = async (req, res) => {
  try {
    // Busca la tarea por su ID y la popula con los datos del usuario
    const task = await Task.findById(req.params.id).populate("user");

    // Verifica si la tarea existe
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    // Devuelve la tarea encontrada en la respuesta
    res.json(task);
  } catch (error) {
    // Maneja los errores si ocurren
    console.error("Error al obtener tarea:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    // Elimina la tarea por su ID
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    // Verifica si la tarea existe
    if (!deletedTask) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    // Devuelve un estado 204 (Sin contenido) para indicar éxito en la eliminación
    res.sendStatus(204);
  } catch (error) {
    // Maneja los errores si ocurren
    console.error("Error al eliminar tarea:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateTask = async (req, res) => {
  try {
    // Actualiza la tarea por su ID con los datos proporcionados en el cuerpo de la solicitud
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    // Verifica si la tarea existe
    if (!updatedTask) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    // Devuelve la tarea actualizada en la respuesta
    res.json(updatedTask);
  } catch (error) {
    // Maneja los errores si ocurren
    console.error("Error al actualizar tarea:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
