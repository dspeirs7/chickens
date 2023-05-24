FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["Chickens.Api/Chickens.Api.csproj", "Chickens.Api/"]
RUN dotnet restore "Chickens.Api/Chickens.Api.csproj"
COPY . . 
WORKDIR "/src/Chickens.Api"
RUN dotnet build "Chickens.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Chickens.Api.csproj" -c Release -o /app/publish

# Build runtime image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Chickens.Api.dll"]