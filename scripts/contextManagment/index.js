import express from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import { deleteAllContexts, getContext, setContext } from './contextManagment.js';

const app = express();
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Context Managment API',
      description: 'API for context managment in Blip platform.',
      contact: {
        name: 'PROA.AI'
      },
      servers: ['http://localhost:5000']
    },
    components: {
      securitySchemes: {
        RouterKeyAuthorization: {
          description: 'Key for authorization in Blip Commands API.',
          type: 'apiKey',
          in: 'header',
          name: 'Authorization'
        }
      }
    },
    security: [{
      ApiKeyAuth: []
    }]
  },
  apis: ['index.js']
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json());
app.use(cors());

/**
 * @swagger
 * /Context/{userId}:
 *   get:
 *     security:
 *     - RouterKeyAuthorization: []
 *     summary: Busca o contexto de um usuário especifico a partir do seu identificador único.
 *     tags:
 *       - Buscar Contexto
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The context was successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userid:
 *                   type: string
 *                 context:
 *                   type: object
 *       400:
 *         description: Bad request, no users informed or other error
 *       401:
 *         description: Unauthorized
 */
app.get('/Context/:userId', async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    if (!req.params.userId) {
      res.status(400).json({ message: 'No user informed' });
      return;
    }
    const userId = req.params.userId;
    const context = await getContext(userId, req.headers.authorization);
    res.json({ userId, context: context });
  }
  catch (e) {
    res.status(400).json({ message: e.message });
  }
});

/**
 * @swagger
 * /Context/{userId}:
 *   put:
 *     security:
 *       - RouterKeyAuthorization: []
 *     summary: Define uma variável de contexto de um usuário especifico a partir do seu identificador único.
 *     tags:
 *       - Definir Variável Contexto
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: contextVariable
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: contextVariableValue
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The context was successfully added.
 *       400:
 *         description: Bad request, no users informed or other error
 *       401:
 *         description: Unauthorized
 */
app.put('/Context/:userId', async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    if (!req.params.userId) {
      res.status(400).json({ message: 'No user informed' });
      return;
    }
    console.log(req.query.contextVariable, req.query.contextVariableValue, req.headers.authorization, req.params.userId)
    const context = await setContext(req.params.userId, req.query.contextVariable, req.query.contextVariableValue, req.headers.authorization);
    res.json({ status: context });
  }
  catch (e) {
    res.status(400).json({ message: e.message });
  }
});

/**
 * @swagger
 * /Context/:
 *   delete:
 *     summary: Permite a exclusão do contexto de usuários em lotes, processando cada usuário de forma sequencial.
 *     description: Este método é ligeiramente otimizado para performance e pode resultar em um throughput significativamente maior do que o máximo da plataforma Blip. Utilize com cautela em cenários com grande volume de usuários.
 *     tags:
 *       - Deletar Contexto
 *     security:
 *     - RouterKeyAuthorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userIds:
 *                 type: array
 *                 items:
 *                   type: string
 *             example:
 *               userIds: ["user1@wa.gw.msging.net", "user2@wa.gw.msging.net", "user3@wa.gw.msging.net"]
 *     responses:
 *       200:
 *         description: The contexts were successfully deleted
 *       400:
 *         description: Bad request, no users informed or other error
 *       401:
 *         description: Unauthorized
 */
app.delete('/Context/', async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const obj = req.body;
    if (!obj.userIds) {
      res.status(400).json({ message: 'No users informed' });
      return;
    }
    let result = deleteAllContexts(obj.userIds, req.headers.authorization);
    res.status(200).json(result);
  }
  catch (e) {
    res.status(400).json({ message: e.message });
  }
});



app.listen(5000, () => { console.log('Server is running on port 5000'); });
//To run and open in browser, run 'npm start' and access http://localhost:5000/swagger





