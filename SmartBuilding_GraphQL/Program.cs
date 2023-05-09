using SmartBuilding_GraphQL.Models;
using SmartBuilding_GraphQL.IService;
using SmartBuilding_GraphQL.Service;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<SmartBuildingDbContext>(options =>
{
     options.UseSqlServer(builder.Configuration.GetConnectionString("SmartBuildingsCS"));
});
builder.Services.AddScoped<IRoomService, RoomService>();
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

app.MapControllers();

app.MapGraphQL("/graphql");

app.Run();