using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AngularUi.Repos;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Serialization;

namespace AngularUi
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<TeamRepo, TeamRepo>();
            services.AddScoped<LeagueRepo, LeagueRepo>();
            services.AddScoped<GameRepo, GameRepo>();
            services.AddScoped<LocationRepo, LocationRepo>();
            // Add framework services.
            // Add framework services.
            services.AddMvc()
                 .AddJsonOptions(opts =>
                 {
                     // Force Camel Case to JSON
                     opts.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                 });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }
            var angularRoutes = new[] { "/teams", "/leagues","/locations","/games" };

            app.Use(async (context, next) =>
            {
                // If the request matches one of those paths, change it.
                // This needs to happen before UseDefaultFiles.
                if (context.Request.Path.HasValue &&
                    null !=
                    angularRoutes.FirstOrDefault(
                    (ar) => context.Request.Path.Value.StartsWith(ar, StringComparison.OrdinalIgnoreCase)))
                {
                    context.Request.Path = new PathString("/");
                }

                await next();
            });
            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
