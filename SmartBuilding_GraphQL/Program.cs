using SmartBuilding_GraphQL.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
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
                           //.AllowCredentials()
                           .AllowAnyOrigin();
                          policy.AllowAnyOrigin();
                          // policy.AllowAnyHeader();
                      });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<SmartBuildingDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("SmartBuildingsCS"));
});
builder.Services.AddScoped<Query>();

builder.Services.AddGraphQLServer().AddQueryType<Query>().AddProjections().AddFiltering().AddSorting();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();
app.UseCors("CORS");

app.MapControllers();

app.MapGraphQL("/graphql");

app.Run();