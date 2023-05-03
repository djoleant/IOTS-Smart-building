using Microsoft.EntityFrameworkCore;
using SmartBuilding_gRPC.Services;
using SmartBuilding_gRPC.Models;

var builder = WebApplication.CreateBuilder(args);

// Additional configuration is required to successfully run gRPC on macOS.
// For instructions on how to configure Kestrel and gRPC clients on macOS, visit https://go.microsoft.com/fwlink/?linkid=2099682

// Add services to the container.
builder.Services.AddGrpc();


builder.Services.AddCors(options =>
{
    options.AddPolicy("CORS",
                      policy =>
                      {
                          policy/*.WithOrigins("http://localhost:5500",
                                    "https://localhost:3000",
                                    "https://localhost:5500",
                                    "https://127.0.0.1:5500",
                                    "http://localhost:3000")*/
                                    .AllowAnyHeader()
                           .AllowAnyMethod()
                           .AllowCredentials()
                           .AllowAnyOrigin();
                          // policy.AllowAnyOrigin();
                          // policy.AllowAnyHeader();
                      });
});



builder.Services.AddDbContext<SmartBuildingDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("SmartBuildingsCS"));
});

// Add builder.Services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

var app = builder.Build();
// Configure the HTTP request pipeline.
app.MapGrpcService<GreeterService>();
app.MapGet("/", () => "Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");

app.Run();
