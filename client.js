const proto = './proto/pacientes.proto'

const grpc = require("grpc")
const protoLoader = require('@grpc/proto-loader')

const packageDefinition = protoLoader.loadSync(proto,{
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
})

const PacienteService = grpc.loadPackageDefinition(packageDefinition).PacienteService
const client = new PacienteService(
    "localhost:30011",
    grpc.credentials.createInsecure()
)
module.exports = client;