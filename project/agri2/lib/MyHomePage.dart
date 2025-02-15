import 'dart:async';
import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:syncfusion_flutter_gauges/gauges.dart';

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  double temperature = 0.0;
  double humidity = 0.0;
  double ph = 0.0;
  double soilMoisture = 0.0;
  double soilMoisture2 = 0.0;
  bool isRaining = false;
  bool isMotorOn = false;
  bool isLoading = false;
  bool isWater=false;
 

  @override
  void initState() {
    super.initState();
    fetchWeatherData();  // Initial fetch
    _startAutoRefresh();  // Start the auto-refresh
  }

  void _startAutoRefresh() {
    Timer.periodic(Duration(seconds: 1), (timer) {
      fetchWeatherData();  // Fetch data every 5 seconds
    });
  }

  Future<void> fetchWeatherData() async {
    final response = await Supabase.instance.client
        .from('Weather')
        .select()
        .limit(1)
        .order('id',ascending: false)
        .maybeSingle();  // Fetch the first available row

    if (response != null) {
      setState(() {
        
        temperature = response['temperature']?.toDouble() ?? 0.0;
        humidity = response['humidity']?.toDouble() ?? 0.0;
        ph = response['PH']?.toDouble() ?? 0.0;
        soilMoisture = response['SoilMoisture']?.toDouble() ?? 0.0;
        soilMoisture2 = response['SoilMoisture2']?.toDouble() ?? 0.0;
        isRaining = response['rain'] == 1;
        isMotorOn = response['motor'] == 1;
        isLoading = false;
        isWater=response['water'] == 0;
      });
    } else {
      print('Error: No data found or query failed.');
      setState(() {
        isLoading = false;
      });
    }
  }

  

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
      
        leading: IconButton(
          icon: Icon(Icons.account_circle, color: Colors.white, size: 40),
          onPressed: () {},
        ),
        backgroundColor: Colors.cyan,
        title: Text("AGROSENSE", style: TextStyle(color: Colors.white,fontWeight: FontWeight.bold)),
      ),
      body: isLoading
          ? Center(child: CircularProgressIndicator())
          : Container(
              child: Center(
                child: Column(
                  children: <Widget>[
                    SizedBox(height: 20),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        _buildCircularProgressBarWithText(
                          progressValue: soilMoisture,
                          color: Colors.orange,
                          text: 'Soil Moisture 1',
                          sufix: '',
                          min:1,
                          max: 100
                        ),
                        _buildCircularProgressBarWithText(
                          progressValue: soilMoisture2,
                          color: Colors.orange,
                          text: 'Soil Moisture 2',
                          sufix: '',
                          min:1,
                          max: 100
                        ),
                      ],
                    ),
                    SizedBox(height: 20),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        _buildCircularProgressBarWithText(
                          progressValue: temperature,
                          color: Colors.blue,
                          text: 'Temperature',
                          sufix: '°C',
                          min: 0 ,
                          max: 100
                        ),
                        _buildCircularProgressBarWithText(
                          progressValue: humidity,
                          color: Colors.red,
                          text: 'Humidity',
                          sufix: '%',
                          min:1,
                          max:100
                        ),
                      ],
                    ),
                    SizedBox(height: 20),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                         _buildCircularProgressBarWithText(
                          progressValue: ph,
                          color: Colors.green,
                          text: 'PH',
                          sufix: '',
                          min:1,
                          max:14
                        ),
                        _buildWaterToggle()
                      ],
                    ),
                    SizedBox(height: 20),
                    Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                    _buildRainComponent(),
                    _buildMotorToggle(),]
                    ),

                  ],
                ),
              ),
            ),
    );
  }

  Widget _buildCircularProgressBarWithText({
    required double progressValue,
    required Color color,
    required String text,
    required String sufix,
    required double min,
    required double max,
  }) {
    return Column(
      children: [
        SizedBox(
          width: 150,
          height: 150,
          child: Container(
            decoration: BoxDecoration(
              border: Border.all(color: Colors.cyan, width: 2.0),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Stack(
              alignment: Alignment.center,
              children: [
                SfRadialGauge(
                  axes: <RadialAxis>[
                    RadialAxis(
                      minimum: min,
                      maximum: max,
                      showLabels: false,
                      showTicks: false,
                      radiusFactor: 0.7,
                      axisLineStyle: AxisLineStyle(
                        thickness: 0.2,
                        color: Colors.grey,
                        thicknessUnit: GaugeSizeUnit.factor,
                      ),
                      pointers: <GaugePointer>[
                        RangePointer(
                          value: progressValue,
                          cornerStyle: CornerStyle.bothCurve,
                          width: 0.2,
                          sizeUnit: GaugeSizeUnit.factor,
                          color: color,
                        ),
                      ],
                    ),
                  ],
                ),
                Text(
                  progressValue.toString() + sufix,
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                ),
                Positioned(
                  bottom: 5,
                  child: Text(
                    text,
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                  ),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildRainComponent() {
    String text=isRaining ? "Raining" : "No Rain";
    return Column(
      children: [
      SizedBox(
          width: 150,
          height: 150,
          child: Container(
            decoration: BoxDecoration(
              border: Border.all(color: Colors.cyan, width: 2.0),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Stack(
              alignment: Alignment.center,
        children: [
        Icon(
          isRaining ? Icons.cloud : Icons.cloud_off,
          color: isRaining ? Colors.blue : Colors.grey,
          size: 75,
        ),
       Positioned(
                  bottom: 5,
                  child: Text(
                    text,
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                ),
      ],))
    )]);
  }
Widget _buildWaterToggle(){
    String text=isWater ? "Water" : "No Water";
    return Column(
      children: [
      SizedBox(
          width: 150,
          height: 150,
          child: Container(
            decoration: BoxDecoration(
              border: Border.all(color: Colors.cyan, width: 2.0),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Stack(
              alignment: Alignment.center,
        children: [
        Icon(
          isWater? Icons.water_drop : Icons.water,
          color: isWater ? Colors.blue : Colors.grey,
          size: 75,
        ),
       Positioned(
                  bottom: 5,
                  child: Text(
                    text,
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                ),
      ],))
    )]);

}

 Widget _buildMotorToggle() {
  return Column(
    children: [
      SizedBox(
        width: 150,
        height: 150,
        child: Container(
          decoration: BoxDecoration(
            border: Border.all(color: Colors.cyan, width: 2.0),
            borderRadius: BorderRadius.circular(10),
          ),
          child: Stack(
            alignment: Alignment.center,
            children: [
              Positioned(
                top: 50,
                child:Transform.scale(
                scale: 1.5,
                child: Switch(
                  
                  value: isMotorOn,
                  onChanged: (value) {
                    // Motor toggle logic goes here
                  },
                  activeColor: Colors.green,
                  inactiveThumbColor: Colors.red,
                ),)
              ),
              Positioned(
                bottom: 5,
                child: Text(
                  'Water Motor',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                ),
              ),
            ],
          ),
        ),
      ),
    ],
  );
}

}
