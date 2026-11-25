plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}
android {
    namespace = "com.hanpan.games"
    compileSdk = 36
    defaultConfig {
        applicationId = "com.hanpan.games"   // ← 내 패키지 이름으로 바꿔도 돼요 (한 번 올리면 못 바꿔요)
        minSdk = 24
        targetSdk = 36   // 구글 플레이: 2026년 8월 31일부터 새 앱은 36 이상 필수
        versionCode = 1                      // 올릴 때마다 1씩 올리기
        versionName = "1.0.0"
    }
    buildTypes {
        release { isMinifyEnabled = false }
    }
    compileOptions { sourceCompatibility = JavaVersion.VERSION_17; targetCompatibility = JavaVersion.VERSION_17 }
    kotlinOptions { jvmTarget = "17" }
    androidResources { noCompress += listOf("js", "html", "css", "json") }
}
dependencies {
    implementation("androidx.webkit:webkit:1.12.1")
    implementation("androidx.core:core-ktx:1.13.1")
    implementation("androidx.activity:activity-ktx:1.9.3")
}
